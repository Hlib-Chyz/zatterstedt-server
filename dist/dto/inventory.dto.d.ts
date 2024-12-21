import { ObjectId } from 'mongodb';
export declare class UpdateInventoryDto {
    _id: ObjectId;
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
    _id: ObjectId;
    name: string;
    totalCost: number;
    amount: number;
    used: number;
    paid: number;
    date: string;
}
export declare class SetUsedFieldDto {
    _id: ObjectId;
    used: number;
}
