import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class ProductDevelopmentCostDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public description: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class ProductAdditionalCostDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class ProductManufacturingCostJobDto {
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class ProductManufacturingCostInventoryDto {
    @IsNotEmpty()
    @IsMongoId()
    public inventoryId: string;
    @IsNotEmpty()
    @IsNumber()
    public quantityInUse: number;
    @IsNotEmpty()
    @IsNumber()
    public quantityInCost: number;
    @IsNotEmpty()
    @IsBoolean()
    public duringManufacture: boolean;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class ProductManufacturingCostDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductManufacturingCostJobDto)
    public jobs: ProductManufacturingCostJobDto[];
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductManufacturingCostInventoryDto)
    public inventory: ProductManufacturingCostInventoryDto[];
}

export class ProductOrderVariantDto {
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public quantity: number;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class ProductOrderDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public userName: string;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductOrderVariantDto)
    public variants: ProductOrderVariantDto[];
}

export class ProductStockDto {
    @IsNumber()
    @IsNotEmpty()
    public total: number;
    @IsNumber()
    @IsNotEmpty()
    public sold: number;
    @IsNumber()
    @IsNotEmpty()
    public realizedParty: number;
}

export class ProductVariantDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsString()
    @IsNotEmpty()
    public size: string;
    @IsString()
    @IsNotEmpty()
    public color: string;
    @IsNotEmpty()
    @Type(() => ProductStockDto)
    public stock: ProductStockDto;
}

export class ProductAdminDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsString()
    @IsNotEmpty()
    public description: string;
    @IsNumber()
    @IsNotEmpty()
    public price: number;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantDto)
    public variants: ProductVariantDto[];
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDevelopmentCostDto)
    public developmentCosts: ProductDevelopmentCostDto[];
    @IsNotEmpty()
    @Type(() => ProductAdditionalCostDto)
    public additionalCost: ProductAdditionalCostDto;
    @IsNotEmpty()
    @Type(() => ProductManufacturingCostDto)
    public manufacturingCost: ProductManufacturingCostDto;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductOrderDto)
    public orders: ProductOrderDto[];
}

export class ProductVariantUpdateDto {
    @IsString()
    @IsNotEmpty()
    public size: string;
    @IsString()
    @IsNotEmpty()
    public color: string;
    @IsNumber()
    @IsNotEmpty()
    public quantity: number;
    @IsNumber()
    @IsNotEmpty()
    public realizedParty: number;
}

export class CreateProductDto {
    @IsNumber()
    @IsNotEmpty()
    public price: number;
    @IsString()
    @IsNotEmpty()
    public description: string;
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantUpdateDto)
    public variants: ProductVariantUpdateDto[];
}

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => new ObjectId(value))
    public _id: ObjectId;
    @IsNumber()
    @IsNotEmpty()
    public price: number;
    @IsString()
    @IsNotEmpty()
    public description: string;
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantUpdateDto)
    public variants: ProductVariantUpdateDto[];
}

export class ProductPriceDto {
    @IsString()
    @IsNotEmpty()
    public price: number;
}

export class ProductDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public price: number;
    @IsNotEmpty()
    @IsString()
    public description: string;
}
