import { Types } from 'mongoose';
declare class ProductDevelopmentCostDto {
    _id: Types.ObjectId;
    date: Date;
    cost: number;
    description: string;
}
declare class ProductAdditionalCostDto {
    _id: Types.ObjectId;
    cost: number;
}
declare class ProductManufacturingCostJobDto {
    name: string;
    cost: number;
    date: string;
}
declare class ProductManufacturingCostInventoryDto {
    inventoryId: Types.ObjectId;
    quantityInUse: number;
    quantityInCost: number;
    duringManufacture: boolean;
    cost: number;
}
declare class ProductManufacturingCostDto {
    _id: Types.ObjectId;
    job: ProductManufacturingCostJobDto[];
    inventory: ProductManufacturingCostInventoryDto[];
}
declare class ProductStockDto {
    total: number;
    sold: number;
    realizedParty: number;
}
export declare class ProductVariantDto {
    _id: Types.ObjectId;
    size: string;
    color: string;
    stock: ProductStockDto;
}
export declare class CreateProductDto {
    price: number;
    name: string;
}
export declare class UpdateProductDto {
    _id: Types.ObjectId;
    price: number;
    name: string;
}
export declare class ProductPriceDto {
    price: number;
}
export declare class ProductDto {
    _id: Types.ObjectId;
    name: string;
    price: number;
    variants: ProductVariantDto[];
    developmentCosts: ProductDevelopmentCostDto[];
    additionalCost: ProductAdditionalCostDto;
    manufacturingCost: ProductManufacturingCostDto;
}
export {};
