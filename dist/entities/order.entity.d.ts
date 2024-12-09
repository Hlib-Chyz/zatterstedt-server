import { ObjectId } from 'mongodb';
import { VariantOrderDto } from 'src/dto/order.dto';
export declare class Order {
    _id: ObjectId;
    date: string;
    orderNumber: string;
    clientId: string;
    variants: VariantOrderDto[];
}
