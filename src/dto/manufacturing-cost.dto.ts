import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class ManufacturingCostDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => JobDto)
    public job: JobDto[];
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InventoryDto)
    public inventory: InventoryDto[];
}

export class CreateManufacturingCostDto {
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
}

export class ManufacturingCostJobDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => JobDto)
    public job: JobDto[];
}

export class ManufacturingCostInventoryDto {
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InventoryDto)
    public inventory: InventoryDto[];
}

export class JobDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsNumber()
    @IsNotEmpty()
    public cost: number;
}

export class InventoryDto {
    @IsNotEmpty()
    @IsMongoId()
    public inventoryId: string;
    @IsNumber()
    @IsNotEmpty()
    public quantityInCost: number;
    @IsNumber()
    @IsNotEmpty()
    public quantityInUse: number;
    @IsNotEmpty()
    @IsBoolean()
    public duringManufacture: boolean;
    @IsNumber()
    @IsNotEmpty()
    public cost: number;
}
