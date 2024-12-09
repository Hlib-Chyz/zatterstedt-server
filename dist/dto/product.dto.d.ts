import { ObjectId } from 'mongodb';
export declare class ProductDevelopmentCostDto {
    _id: ObjectId;
    date: string;
    description: string;
    cost: number;
}
export declare class ProductAdditionalCostDto {
    _id: ObjectId;
    cost: number;
}
export declare class ProductManufacturingCostJobDto {
    name: string;
    cost: number;
}
export declare class ProductManufacturingCostInventoryDto {
    inventoryId: string;
    quantityInUse: number;
    quantityInCost: number;
    duringManufacture: boolean;
    cost: number;
}
export declare class ProductManufacturingCostDto {
    _id: ObjectId;
    job: ProductManufacturingCostJobDto[];
    inventory: ProductManufacturingCostInventoryDto[];
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
export declare class ProductAdminDto {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    variants: ProductVariantDto[];
    developmentCosts: ProductDevelopmentCostDto[];
    additionalCost: ProductAdditionalCostDto;
    manufacturingCost: ProductManufacturingCostDto;
}
export declare class CreateProductDto {
    price: number;
    description: string;
    name: string;
}
export declare class UpdateProductDto {
    _id: ObjectId;
    price: number;
    description: string;
    name: string;
}
export declare class ProductPriceDto {
    price: number;
}
export declare class ProductDto {
    _id: ObjectId;
    name: string;
    price: number;
    description: string;
}
