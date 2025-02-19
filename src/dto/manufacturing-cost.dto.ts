import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

export class ManufacturingCostDto {
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public productId: Types.ObjectId;
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
    public productId: Types.ObjectId;
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
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => InventoryDto)
    public oldInventory: InventoryDto[];
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
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public inventoryId: Types.ObjectId;
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

export class CanSaveInventoryDto {
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }: { value: string[] }) =>
        value.map((id: string) => new Types.ObjectId(id))
    )
    public variantIds: Types.ObjectId[];
}

export class CanSaveInventoryResponseDto {
    @IsNotEmpty()
    @IsBoolean()
    public canSaveInventory: boolean;
}
