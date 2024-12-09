import { ObjectId } from 'mongodb';
export declare class Stock {
    _id: ObjectId;
    variantId: string;
    sold: number;
    total: number;
    realizedParty: number;
}
