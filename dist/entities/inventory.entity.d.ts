import { ObjectId } from 'mongodb';
export declare class Inventory {
    _id: ObjectId;
    name: string;
    totalCost: number;
    amount: number;
    used: number;
    paid: number;
    date: string;
}
