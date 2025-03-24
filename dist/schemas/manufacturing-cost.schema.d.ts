import { HydratedDocument, Types } from 'mongoose';
declare class Job {
    name: string;
    cost: number;
    date: Date;
}
declare class InventoryItem {
    inventoryId: Types.ObjectId;
    quantityInCost: number;
    quantityInUse: number;
    duringManufacture: boolean;
    cost: number;
}
export type ManufacturingCostDocument = HydratedDocument<ManufacturingCost>;
export declare class ManufacturingCost {
    productId: Types.ObjectId;
    job: Job[];
    inventory: InventoryItem[];
}
export declare const ManufacturingCostSchema: import('mongoose').Schema<
    ManufacturingCost,
    import('mongoose').Model<
        ManufacturingCost,
        any,
        any,
        any,
        import('mongoose').Document<unknown, any, ManufacturingCost> &
            ManufacturingCost & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            },
        any
    >,
    {},
    {},
    {},
    {},
    import('mongoose').DefaultSchemaOptions,
    ManufacturingCost,
    import('mongoose').Document<unknown, {}, import('mongoose').FlatRecord<ManufacturingCost>> &
        import('mongoose').FlatRecord<ManufacturingCost> & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        }
>;
export {};
