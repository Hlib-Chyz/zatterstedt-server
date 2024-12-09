import { ObjectId } from 'mongodb';
export declare class CreateOrderDto {
    date: string;
    contacts: string;
    clientName: string;
    clientId: string;
    variants: VariantOrderDto[];
}
export declare class OrderDto {
    _id: ObjectId;
    date: string;
    orderNumber: string;
    client: string;
    variants: string[];
}
export declare class OrderVariantDto {
    _id: ObjectId;
    date: string;
    clientId: string;
    variants: VariantOrderDto[];
}
export declare class VariantOrderDto {
    _id: string;
    quantity: number;
    price: number;
}
