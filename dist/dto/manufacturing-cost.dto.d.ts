import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
export declare class ManufacturingCostDto {
    _id: ObjectId;
    productId: string;
    job: JobDto[];
    inventory: InventoryDto[];
}
export declare class CreateManufacturingCostDto {
    productId: Types.ObjectId;
}
export declare class ManufacturingCostJobDto {
    job: JobDto[];
}
export declare class ManufacturingCostInventoryDto {
    inventory: InventoryDto[];
    oldInventory: InventoryDto[];
}
export declare class JobDto {
    name: string;
    cost: number;
}
export declare class InventoryDto {
    inventoryId: Types.ObjectId;
    quantityInCost: number;
    quantityInUse: number;
    duringManufacture: boolean;
    cost: number;
}
export declare class CanSaveInventoryDto {
    variantIds: Types.ObjectId[];
}
export declare class CanSaveInventoryResponseDto {
    canSaveInventory: boolean;
}
