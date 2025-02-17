import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
export declare class CreateOrderDto {
    date: string;
    contact: string;
    clientName: string;
    clientId: string;
    variants: VariantOrderDto[];
}
export declare class OrderDto {
    _id: ObjectId;
    date: Date;
    orderNumber: string;
    client: string;
    variants: string[];
    constructor(partial: OrderDto);
}
export declare class OrderVariantDto {
    _id: ObjectId;
    date: string;
    clientId: string;
    variants: VariantOrderDto[];
}
export declare class VariantOrderDto {
    _id: Types.ObjectId;
    quantity: number;
    price: number;
}
