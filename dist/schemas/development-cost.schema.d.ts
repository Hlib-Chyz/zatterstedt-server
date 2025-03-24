import { HydratedDocument, Types } from 'mongoose';
export type DevelopmentCostDocument = HydratedDocument<DevelopmentCost>;
export declare class DevelopmentCost {
    date: Date;
    description: string;
    cost: number;
    productId: Types.ObjectId;
}
export declare const DevelopmentCostSchema: import("mongoose").Schema<DevelopmentCost, import("mongoose").Model<DevelopmentCost, any, any, any, import("mongoose").Document<unknown, any, DevelopmentCost> & DevelopmentCost & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DevelopmentCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<DevelopmentCost>> & import("mongoose").FlatRecord<DevelopmentCost> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
