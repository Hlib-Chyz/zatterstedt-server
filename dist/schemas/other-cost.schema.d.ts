import { HydratedDocument } from 'mongoose';
export type OtherCostDocument = HydratedDocument<OtherCost>;
export declare class OtherCost {
    date: Date;
    name: string;
    cost: number;
}
export declare const OtherCostSchema: import("mongoose").Schema<OtherCost, import("mongoose").Model<OtherCost, any, any, any, import("mongoose").Document<unknown, any, OtherCost> & OtherCost & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OtherCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<OtherCost>> & import("mongoose").FlatRecord<OtherCost> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
