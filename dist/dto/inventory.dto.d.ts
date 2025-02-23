import { Types } from 'mongoose';
export declare class UpdateInventoryDto {
    _id: Types.ObjectId;
    name: string;
    totalCost: number;
    amount: number;
    used: number;
    date: string;
}
export declare class CreateInventoryDto {
    name: string;
    totalCost: number;
    amount: number;
    used: number;
    date: string;
}
export declare class InventoryDto {
    _id: Types.ObjectId;
    name: string;
    totalCost: number;
    amount: number;
    used: number;
    paid: number;
    date: Date;
}
export declare class SetUsedFieldDto {
    _id: Types.ObjectId;
    used: number;
}
