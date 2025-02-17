import { HydratedDocument, Types } from 'mongoose';
export type AdditionalCostDocument = HydratedDocument<AdditionalCost>;
export declare class AdditionalCost {
    productId: Types.ObjectId;
    cost: number;
}
export declare const AdditionalCostSchema: import("mongoose").Schema<AdditionalCost, import("mongoose").Model<AdditionalCost, any, any, any, import("mongoose").Document<unknown, any, AdditionalCost> & AdditionalCost & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AdditionalCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<AdditionalCost>> & import("mongoose").FlatRecord<AdditionalCost> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
