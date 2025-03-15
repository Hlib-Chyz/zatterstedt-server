import { Types } from 'mongoose';
export declare class ManufacturingCostJobDto {
    job: JobDto[];
}
export declare class JobDto {
    name: string;
    cost: number;
    date: string;
}
export declare class ManufacturingCostInventoryDto {
    inventory: InventoryDto[];
    oldInventory: InventoryDto[];
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
