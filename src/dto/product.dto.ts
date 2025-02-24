import { Expose, Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDate,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

class ProductDevelopmentCostDto {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsDate()
    public date: Date;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public description: string;
}

class ProductAdditionalCostDto {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

class ProductManufacturingCostJobDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

class ProductManufacturingCostInventoryDto {
    @Expose()
    @IsNotEmpty()
    @IsMongoId()
    public inventoryId: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public quantityInUse: number;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public quantityInCost: number;
    @Expose()
    @IsNotEmpty()
    @IsBoolean()
    public duringManufacture: boolean;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

class ProductManufacturingCostDto {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductManufacturingCostJobDto)
    public job: ProductManufacturingCostJobDto[];
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductManufacturingCostInventoryDto)
    public inventory: ProductManufacturingCostInventoryDto[];
}

class ProductStockDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public total: number;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public sold: number;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public realizedParty: number;
}

export class ProductVariantDto {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    public _id: Types.ObjectId;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public size: string;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public color: string;
    @Expose()
    @IsNotEmpty()
    @Type(() => ProductStockDto)
    public stock: ProductStockDto;
}

export class CreateProductDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public price: number;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public name: string;
}

export class UpdateProductDto {
    @Expose()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public price: number;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public name: string;
}

export class ProductPriceDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public price: number;
}

export class ProductDto {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    public _id: Types.ObjectId;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public name: string;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public price: number;
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductVariantDto)
    public variants: ProductVariantDto[];
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDevelopmentCostDto)
    public developmentCosts: ProductDevelopmentCostDto[];
    @Expose()
    @IsNotEmpty()
    @Type(() => ProductAdditionalCostDto)
    public additionalCost: ProductAdditionalCostDto;
    @Expose()
    @IsNotEmpty()
    @Type(() => ProductManufacturingCostDto)
    public manufacturingCost: ProductManufacturingCostDto;
}
