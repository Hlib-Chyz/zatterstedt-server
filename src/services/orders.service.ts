import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto, OrderVariantDto } from 'src/dto/order.dto';
import { Order } from 'src/entities/order.entity';
import { MongoRepository, Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { SuccessDto } from '@dto/shared.dto';

@Injectable()
export class OrdersService {
    public constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        private readonly errorService: ErrorService
    ) {}

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

    public async getOrdersByClientId(clientId: string): Promise<OrderVariantDto[]> {
        try {
            return await this.ordersRepository.find({
                where: { clientId },
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders by clientId');
            return [];
        }
    }

    public async getAll(): Promise<Order[]> {
        try {
            return await this.ordersRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all orders');
            return [];
        }
    }

    public async add(
        clientId: string,
        order: CreateOrderDto,
        ordersLength: number
    ): Promise<SuccessDto> {
        try {
            await this.ordersRepository.save({
                clientId: clientId || order.clientId,
                date: order.date,
                variants: order.variants,
                orderNumber: (ordersLength + 2).toString().padStart(5, '0'),
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all orders');
            return { success: false };
        }
    }
}
