import { Transform, Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsMongoId,
    IsArray,
    IsNumber,
    ValidateNested,
    IsBoolean,
} from 'class-validator';
import { Types } from 'mongoose';

export class VariantDto {
    @IsNotEmpty()
    public _id: Types.ObjectId;
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
    public productId: Types.ObjectId;
}

export class VariantLockupDto {
    @IsNotEmpty()
    public _id: Types.ObjectId;
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

export class UpdateVariantDto {
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public productId: Types.ObjectId;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantUpdateDto)
    public variants: VariantUpdateDto[];
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }: { value: string[] }) =>
        value.map((id: string) => new Types.ObjectId(id))
    )
    public oldVariantIds: Types.ObjectId[];
}

export class CanSaveVariantDto {
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }: { value: string[] }) =>
        value.map((id: string) => new Types.ObjectId(id))
    )
    public variantIds: Types.ObjectId[];
}

export class CanSaveVariantResponseDto {
    @IsNotEmpty()
    @IsBoolean()
    public canSaveVariant: boolean;
}
