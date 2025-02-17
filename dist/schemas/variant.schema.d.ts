import { HydratedDocument, Types } from 'mongoose';
export type VariantDocument = HydratedDocument<Variant>;
export declare class Variant {
    color: string;
    size: string;
    productId: Types.ObjectId;
}
export declare const VariantSchema: import("mongoose").Schema<Variant, import("mongoose").Model<Variant, any, any, any, import("mongoose").Document<unknown, any, Variant> & Variant & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Variant, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Variant>> & import("mongoose").FlatRecord<Variant> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
