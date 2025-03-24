import { Model, Types } from 'mongoose';
import { CreateOrderDto } from 'src/dto/order.dto';
import { OrderDocument } from 'src/schemas/order.schema';
import { ErrorService } from './error.service';
export declare class OrderService {
    private orderModel;
    private readonly errorService;
    constructor(orderModel: Model<OrderDocument>, errorService: ErrorService);
    getByVariantId(variantId: Types.ObjectId): Promise<OrderDocument[]>;
    getByClientId(clientId: Types.ObjectId): Promise<OrderDocument[]>;
    getAll(): Promise<OrderDocument[]>;
    add(
        clientId: Types.ObjectId | null,
        order: CreateOrderDto,
        ordersLength: number
    ): Promise<void>;
}
