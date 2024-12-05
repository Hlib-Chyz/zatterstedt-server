import { ManufacturingCost } from '@entities/manufacturing-cost.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, OrderDto, OrderVariantDto } from 'src/dto/order.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Order } from 'src/entities/order.entity';
import { MongoRepository, Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { ErrorService } from './error.service';
import { InventoryService } from './inventory.service';
import { StockService } from './stock.service';
import { VariantsService } from './variants.service';

@Injectable()
export class OrdersService {
    public constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(ManufacturingCost)
        private manufacturingCostsRepository: Repository<ManufacturingCost>,
        private readonly errorService: ErrorService,
        private readonly stockService: StockService,
        private readonly inventoryService: InventoryService,
        private readonly clientsService: ClientsService,
        private readonly variantsService: VariantsService
    ) {}

    public async getAll(): Promise<OrderDto[]> {
        try {
            const orders = await this.ordersRepository.find();
            const res: OrderDto[] = [];
            for (const order of orders) {
                const client = await this.clientsService.getByClientId(order.clientId);
                const resVariant: string[] = [];
                for (const variant of order.variants) {
                    resVariant.push(
                        `${await this.variantsService.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`
                    );
                }

                res.push({
                    _id: order._id,
                    date: order.date,
                    client: `${client.name} - ${client.contacts}`,
                    variants: resVariant,
                });
            }
            return res;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders');
            return [];
        }
    }

    public async getByVariantId(variantId: string): Promise<OrderVariantDto[]> {
        try {
            const mongoRepository = this.ordersRepository as MongoRepository<Order>;
            return await mongoRepository.find({
                where: {
                    variants: { $elemMatch: { _id: variantId } },
                },
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders by variant id');
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
                const productId = await this.variantsService.getProductId(variant._id);
                const manufacturingCost = await this.manufacturingCostsRepository.findOne({
                    where: { productId },
                });
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
            await this.ordersRepository.save({
                clientId: clientId || order.clientId,
                date: order.date,
                variants: order.variants,
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create manufacturing cost');
            return { success: false };
        }
    }
}
