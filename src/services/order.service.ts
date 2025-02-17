import { SuccessDto } from '@dto/shared.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateOrderDto } from 'src/dto/order.dto';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import { ErrorService } from './error.service';

@Injectable()
export class OrderService {
    public constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        private readonly errorService: ErrorService
    ) {}

    public async getByVariantId(variantId: ObjectId): Promise<Order[]> {
        try {
            return await this.orderModel.find({ 'variants._id': variantId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders by variant id');
            return [];
        }
    }

    public async getByClientId(clientId: ObjectId): Promise<OrderDocument[]> {
        try {
            return await this.orderModel.find({ clientId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders by clientId');
            return [];
        }
    }

    public async getAll(): Promise<OrderDocument[]> {
        try {
            return await this.orderModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all orders');
            return [];
        }
    }

    public async add(
        clientId: ObjectId | null,
        order: CreateOrderDto,
        ordersLength: number
    ): Promise<SuccessDto> {
        try {
            const orderNumber = (ordersLength + 2).toString().padStart(5, '0');
            const newOrder = new this.orderModel({
                clientId: clientId || order.clientId,
                date: order.date,
                variants: order.variants,
                orderNumber,
            });
            await newOrder.save();
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add order');
            return { success: false };
        }
    }
}
