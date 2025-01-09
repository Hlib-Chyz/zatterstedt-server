import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsMongoId,
    IsArray,
    IsNumber,
    ValidateNested,
    IsBoolean,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class VariantDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsString()
    public color: string;
    @IsNotEmpty()
    @IsString()
    public size: string;
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
}

export class CreateVariantDto {
    @IsNotEmpty()
    @IsString()
    public color: string;
    @IsNotEmpty()
    @IsString()
    public size: string;
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
}

export class VariantLockupDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsString()
    public name: string;
}

class VariantUpdateDto {
    @IsString()
    @IsNotEmpty()
    public size: string;
    @IsString()
    @IsNotEmpty()
    public color: string;
    @IsNumber()
    @IsNotEmpty()
    public quantity: number;
}

export class CreateVariantsDto {
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantUpdateDto)
    public variants: VariantUpdateDto[];
    @IsArray()
    @IsString({ each: true })
    public oldVariantIds: string[];
}

export class CanSaveVariantsDto {
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    public variantIds: string[];
}

export class CanSaveVariantsResponseDto {
    @IsNotEmpty()
    @IsBoolean()
    public canSaveVariants: boolean;
}
