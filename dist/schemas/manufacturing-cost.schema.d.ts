import { HydratedDocument, Types } from 'mongoose';
export type ManufacturingCostDocument = HydratedDocument<ManufacturingCost>;
export declare class Job {
    name: string;
    cost: number;
}
export declare const JobSchema: import("mongoose").Schema<Job, import("mongoose").Model<Job, any, any, any, import("mongoose").Document<unknown, any, Job> & Job & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Job, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Job>> & import("mongoose").FlatRecord<Job> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class InventoryItem {
    inventoryId: Types.ObjectId;
    quantityInCost: number;
    quantityInUse: number;
    duringManufacture: boolean;
    cost: number;
}
export declare const InventorySchema: import("mongoose").Schema<InventoryItem, import("mongoose").Model<InventoryItem, any, any, any, import("mongoose").Document<unknown, any, InventoryItem> & InventoryItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InventoryItem, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<InventoryItem>> & import("mongoose").FlatRecord<InventoryItem> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare class ManufacturingCost {
    productId: Types.ObjectId;
    job: Job[];
    inventory: InventoryItem[];
}
export declare const ManufacturingCostSchema: import("mongoose").Schema<ManufacturingCost, import("mongoose").Model<ManufacturingCost, any, any, any, import("mongoose").Document<unknown, any, ManufacturingCost> & ManufacturingCost & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ManufacturingCost, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ManufacturingCost>> & import("mongoose").FlatRecord<ManufacturingCost> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
