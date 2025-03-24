import { CreateOrderDto, OrderDto } from '@dto/order.dto';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ClientService } from '@services/client.service';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { OrderService } from '@services/order.service';
import { StockService } from '@services/stock.service';
import { VariantService } from '@services/variant.service';
import { plainToInstance } from 'class-transformer';
import { Connection, Types } from 'mongoose';
import { VariantFacade } from 'src/facades/variant.facade';

@Injectable()
export class OrderFacade {
    public constructor(
        private readonly errorService: ErrorService,
        private readonly stockService: StockService,
        private readonly inventoryService: InventoryService,
        private readonly clientService: ClientService,
        private readonly variantService: VariantService,
        private readonly variantFacade: VariantFacade,
        private readonly orderService: OrderService,
        private readonly manufacturingCostService: ManufacturingCostService,
        @InjectConnection() private readonly connection: Connection
    ) {}

    public async getAll(): Promise<OrderDto[]> {
        try {
            const orders = await this.orderService.getAll();

            const res = await Promise.all(
                orders.map(async (order) => {
                    const [client, variantInfo] = await Promise.all([
                        this.clientService.getById(order.clientId),
                        Promise.all(
                            order.variants.map((variant) =>
                                this.variantFacade.getVariantInfo(
                                    variant._id,
                                    `${variant.quantity}/${variant.price}`
                                )
                            )
                        ),
                    ]);

                    return {
                        _id: order._id,
                        date: order.date,
                        client: `${client.name} - ${client.contact}`,
                        variants: variantInfo,
                        orderNumber: order.orderNumber,
                    };
                })
            );

            return plainToInstance(OrderDto, res, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders');
            return [];
        }
    }

    // TODO TRANSACTION
    public async add(order: CreateOrderDto): Promise<void> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            let clientId: Types.ObjectId | null = order.clientId ?? null;
            if (!clientId) {
                clientId = await this.clientService.add(order.clientName, order.contact, session);
            }
            for (const variant of order.variants) {
                const productId = await this.variantService.getProductId(variant._id);

                if (variant.price === 0) {
                    await this.stockService.decreaseRealizedParty(
                        variant._id,
                        variant.quantity,
                        session
                    );
                }

                const manufacturingCost =
                    await this.manufacturingCostService.getByProductId(productId);
                for (const inventory of manufacturingCost?.inventory ?? []) {
                    if (!inventory.duringManufacture) {
                        await this.inventoryService.updateUsedAndPaid(
                            inventory.inventoryId,
                            variant.quantity * inventory.quantityInUse,
                            variant.quantity * inventory.quantityInCost,
                            session
                        );
                    }
                }

                await this.stockService.increaseSold(variant._id, variant.quantity, session);
            }

            const ordersCount = (await this.orderService.getAll()).length;
            await this.orderService.add(clientId, order, ordersCount);
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.errorService.throwError(error, 'Failed to add order');
        } finally {
            session.endSession();
        }
    }
}
