import { Transform, Type } from 'class-transformer';
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

export class ProductDevelopmentCostDto {
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsDate()
    public date: Date;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
    @IsNotEmpty()
    @IsString()
    public description: string;

    public constructor(partial: ProductDevelopmentCostDto) {
        Object.assign(this, partial);
    }
}

export class ProductAdditionalCostDto {
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;

    public constructor(partial: ProductAdditionalCostDto) {
        Object.assign(this, partial);
    }
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
    public inventoryId: Types.ObjectId;
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
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductManufacturingCostJobDto)
    public job: ProductManufacturingCostJobDto[];
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductManufacturingCostInventoryDto)
    public inventory: ProductManufacturingCostInventoryDto[];

    public constructor(partial: ProductManufacturingCostDto) {
        Object.assign(this, partial);
    }
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
    public _id: Types.ObjectId;
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

export class CreateProductDto {
    @IsNumber()
    @IsNotEmpty()
    public price: number;
    @IsString()
    @IsNotEmpty()
    public name: string;
}

export class UpdateProductDto {
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @IsNumber()
    @IsNotEmpty()
    public price: number;
    @IsString()
    @IsNotEmpty()
    public name: string;
}

export class ProductPriceDto {
    @IsNumber()
    @IsNotEmpty()
    public price: number;
}

export class ProductDto {
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @IsString()
    @IsNotEmpty()
    public name: string;
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

    public constructor(partial: ProductDto) {
        Object.assign(this, partial);
    }
}
