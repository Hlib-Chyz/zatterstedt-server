import { Expose, Transform, Type } from 'class-transformer';
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
import { Types } from 'mongoose';

export class ManufacturingCostJobDto {
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => JobDto)
    public job: JobDto[];
}

export class JobDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public name: string;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public cost: number;
    @Expose()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
}

export class ManufacturingCostInventoryDto {
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InventoryDto)
    public inventory: InventoryDto[];
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InventoryDto)
    public oldInventory: InventoryDto[];
}

export class InventoryDto {
    @Expose()
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public inventoryId: Types.ObjectId;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public quantityInCost: number;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public quantityInUse: number;
    @Expose()
    @IsNotEmpty()
    @IsBoolean()
    public duringManufacture: boolean;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public cost: number;
}

export class CanSaveInventoryDto {
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }: { value: string[] }) =>
        value.map((id: string) => new Types.ObjectId(id))
    )
    public variantIds: Types.ObjectId[];
}

export class CanSaveInventoryResponseDto {
    @Expose()
    @IsNotEmpty()
    @IsBoolean()
    public canSaveInventory: boolean;
}
