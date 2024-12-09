import { ObjectId } from 'mongodb';
export declare class DevelopmentCost {
    _id: ObjectId;
    date: string;
    description: string;
    cost: number;
    productId: string;
}
