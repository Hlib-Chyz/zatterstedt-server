import { SuccessDto } from '@dto/shared.dto';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateOrderDto } from 'src/dto/order.dto';
import { Order, OrderDocument } from 'src/schemas/order.schema';
import { ErrorService } from './error.service';
export declare class OrderService {
    private orderModel;
    private readonly errorService;
    constructor(orderModel: Model<Order>, errorService: ErrorService);
    getByVariantId(variantId: ObjectId): Promise<Order[]>;
    getByClientId(clientId: ObjectId): Promise<OrderDocument[]>;
    getAll(): Promise<OrderDocument[]>;
    add(
        clientId: ObjectId | null,
        order: CreateOrderDto,
        ordersLength: number
    ): Promise<SuccessDto>;
}
