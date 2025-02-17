import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
export declare class ProductDevelopmentCostDto {
    _id: ObjectId;
    date: Date;
    cost: number;
    description: string;
    constructor(partial: ProductDevelopmentCostDto);
}
export declare class ProductAdditionalCostDto {
    _id: ObjectId;
    cost: number;
    constructor(partial: ProductAdditionalCostDto);
}
export declare class ProductManufacturingCostJobDto {
    name: string;
    cost: number;
}
export declare class ProductManufacturingCostInventoryDto {
    inventoryId: Types.ObjectId;
    quantityInUse: number;
    quantityInCost: number;
    duringManufacture: boolean;
    cost: number;
}
export declare class ProductManufacturingCostDto {
    _id: ObjectId;
    job: ProductManufacturingCostJobDto[];
    inventory: ProductManufacturingCostInventoryDto[];
    constructor(partial: ProductManufacturingCostDto);
}
export declare class ProductStockDto {
    total: number;
    sold: number;
    realizedParty: number;
}
export declare class ProductVariantDto {
    _id: ObjectId;
    size: string;
    color: string;
    stock: ProductStockDto;
}
export declare class CreateProductDto {
    price: number;
    name: string;
}
export declare class UpdateProductDto {
    _id: ObjectId;
    price: number;
    name: string;
}
export declare class ProductPriceDto {
    price: number;
}
export declare class ProductDto {
    _id: ObjectId;
    name: string;
    price: number;
    variants: ProductVariantDto[];
    developmentCosts: ProductDevelopmentCostDto[];
    additionalCost: ProductAdditionalCostDto;
    manufacturingCost: ProductManufacturingCostDto;
    constructor(partial: ProductDto);
}
