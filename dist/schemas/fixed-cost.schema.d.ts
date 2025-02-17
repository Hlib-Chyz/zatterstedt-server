import { HydratedDocument } from 'mongoose';
export type FixedCostDocument = HydratedDocument<FixedCost>;
export declare class FixedCost {
    name: string;
    cost: number;
}
export declare const FixedCostSchema: import("mongoose").Schema<FixedCost, import("mongoose").Model<FixedCost, any, any, any, import("mongoose").Document<unknown, any, FixedCost> & FixedCost & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FixedCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<FixedCost>> & import("mongoose").FlatRecord<FixedCost> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
