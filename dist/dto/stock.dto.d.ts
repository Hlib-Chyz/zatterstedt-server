import { ObjectId } from 'mongodb';
export declare class StockDto {
    _id: ObjectId;
    variantId: string;
    sold: number;
    total: number;
    realizedParty: number;
}
export declare class CreateStockDto {
    variantId: string;
    total: number;
}
export declare class SetRealizedPartyDto {
    variantId: string;
    realizedParty: number;
}
