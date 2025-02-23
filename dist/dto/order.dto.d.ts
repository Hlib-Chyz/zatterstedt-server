import { Types } from 'mongoose';
export declare class CreateOrderDto {
    date: string;
    contact: string;
    clientName: string;
    clientId: Types.ObjectId;
    variants: VariantOrderDto[];
}
export declare class VariantOrderDto {
    _id: Types.ObjectId;
    quantity: number;
    price: number;
}
export declare class OrderDto {
    _id: Types.ObjectId;
    date: Date;
    orderNumber: string;
    client: string;
    variants: string[];
}
