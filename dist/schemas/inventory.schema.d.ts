import { HydratedDocument } from 'mongoose';
export type InventoryDocument = HydratedDocument<Inventory>;
export declare class Inventory {
    name: string;
    totalCost: number;
    amount: number;
    used: number;
    paid: number;
    date: Date;
}
export declare const InventorySchema: import("mongoose").Schema<Inventory, import("mongoose").Model<Inventory, any, any, any, import("mongoose").Document<unknown, any, Inventory> & Inventory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Inventory, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Inventory>> & import("mongoose").FlatRecord<Inventory> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
