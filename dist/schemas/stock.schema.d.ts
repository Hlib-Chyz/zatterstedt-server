import { HydratedDocument, Types } from 'mongoose';
export type StockDocument = HydratedDocument<Stock>;
export declare class Stock {
    variantId: Types.ObjectId;
    sold: number;
    total: number;
    realizedParty: number;
}
export declare const StockSchema: import("mongoose").Schema<Stock, import("mongoose").Model<Stock, any, any, any, import("mongoose").Document<unknown, any, Stock> & Stock & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Stock, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Stock>> & import("mongoose").FlatRecord<Stock> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
