import { CreateOrderDto, OrderDto } from '@dto/order.dto';
import { SuccessDto } from '@dto/shared.dto';
import { Injectable } from '@nestjs/common';
import { ClientService } from '@services/client.service';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { OrderService } from '@services/order.service';
import { StockService } from '@services/stock.service';
import { VariantService } from '@services/variant.service';
import { Types } from 'mongoose';
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
        private readonly manufacturingCostService: ManufacturingCostService
    ) {}

    public async getAll(): Promise<OrderDto[]> {
        try {
            const orders = await this.orderService.getAll();
            const res: OrderDto[] = [];
            for (const order of orders) {
                const client = await this.clientService.getById(order.clientId);
                const resVariant: string[] = [];
                for (const variant of order.variants) {
                    resVariant.push(
                        `${await this.variantFacade.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`
                    );
                }

                res.push(
                    new OrderDto({
                        _id: order._id,
                        date: order.date,
                        client: `${client.name} - ${client.contact}`,
                        variants: resVariant,
                        orderNumber: order.orderNumber,
                    })
                );
            }
            return res;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders');
            return [];
        }
    }

    public async add(order: CreateOrderDto): Promise<SuccessDto> {
        try {
            let clientId: Types.ObjectId | null = null;
            if (!order.clientId) {
                clientId = await this.clientService.add({
                    name: order.clientName,
                    contact: order.contact,
                });
            }
            for (const variant of order.variants) {
                if (variant.price === 0) {
                    await this.stockService.decreaseRealizedParty(variant._id, variant.quantity);
                }
                const productId = await this.variantService.getProductId(variant._id);
                const manufacturingCost =
                    await this.manufacturingCostService.getByProductId(productId);
                for (const inventory of manufacturingCost?.inventory ?? []) {
                    if (!inventory.duringManufacture) {
                        await this.inventoryService.updateUsedAndPaid(
                            inventory.inventoryId,
                            variant.quantity * inventory.quantityInUse,
                            variant.quantity * inventory.quantityInCost
                        );
                    }
                }
                await this.stockService.increaseSold(variant._id, variant.quantity);
            }
            const orders = await this.orderService.getAll();
            await this.orderService.add(clientId, order, orders.length);
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add order');
            return new SuccessDto({ success: false });
        }
    }
}
