import { CreateOrderDto, OrderDto } from '@dto/order.dto';
import { SuccessDto } from '@dto/shared.dto';
import { Injectable } from '@nestjs/common';
import { ClientsService } from '@services/clients.service';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostsService } from '@services/manufacturing-costs.service';
import { OrdersService } from '@services/orders.service';
import { StockService } from '@services/stock.service';
import { VariantsService } from '@services/variants.service';
import { VariantFacade } from 'src/facades/variant.facade';

@Injectable()
export class OrderFacade {
    public constructor(
        private readonly errorService: ErrorService,
        private readonly stockService: StockService,
        private readonly inventoryService: InventoryService,
        private readonly clientsService: ClientsService,
        private readonly variantsService: VariantsService,
        private readonly variantFacade: VariantFacade,
        private readonly ordersService: OrdersService,
        private readonly manufacturingCostsService: ManufacturingCostsService
    ) {}

    public async getAll(): Promise<OrderDto[]> {
        try {
            const orders = await this.ordersService.getAll();
            const res: OrderDto[] = [];
            for (const order of orders) {
                const client = await this.clientsService.getByClientId(order.clientId);
                const resVariant: string[] = [];
                for (const variant of order.variants) {
                    resVariant.push(
                        `${await this.variantFacade.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`
                    );
                }

                res.push({
                    _id: order._id,
                    date: order.date,
                    client: `${client.name} - ${client.contacts}`,
                    variants: resVariant,
                    orderNumber: order.orderNumber,
                });
            }
            return res;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders');
            return [];
        }
    }

    public async add(order: CreateOrderDto): Promise<SuccessDto> {
        try {
            let clientId = '';
            if (!order.clientId) {
                clientId = (
                    await this.clientsService.add({
                        name: order.clientName,
                        contacts: order.contacts,
                    })
                ).toString();
            }
            for (const variant of order.variants) {
                if (variant.price === 0) {
                    await this.stockService.decreaseRealizedParty(variant._id, variant.quantity);
                }
                const productId = await this.variantsService.getProductId(variant._id);
                const manufacturingCost =
                    await this.manufacturingCostsService.getByProductId(productId);
                for (const inventory of manufacturingCost?.inventory ?? []) {
                    if (!inventory.duringManufacture) {
                        await this.inventoryService.changeInventoryAmount(
                            inventory.inventoryId,
                            variant.quantity * inventory.quantityInUse,
                            variant.quantity * inventory.quantityInCost
                        );
                    }
                }
                await this.stockService.increaseSold(variant._id, variant.quantity);
            }
            const orders = await this.ordersService.getAll();
            await this.ordersService.add(clientId, order, orders.length);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add order');
            return { success: false };
        }
    }
}
