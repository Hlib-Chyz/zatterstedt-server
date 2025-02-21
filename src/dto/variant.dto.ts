import { Expose, Transform, Type } from 'class-transformer';
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

export class VariantLockupDto {
    @Expose()
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
}

class VariantUpdateDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public size: string;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public color: string;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public quantity: number;
}

export class UpdateVariantDto {
    @Expose()
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public productId: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantUpdateDto)
    public variants: VariantUpdateDto[];
    @Expose()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }: { value: string[] }) =>
        value.map((id: string) => new Types.ObjectId(id))
    )
    public oldVariantIds: Types.ObjectId[];
}

export class CanSaveVariantDto {
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    @Transform(({ value }: { value: string[] }) =>
        value.map((id: string) => new Types.ObjectId(id))
    )
    public variantIds: Types.ObjectId[];
}

export class CanSaveVariantResponseDto {
    @Expose()
    @IsNotEmpty()
    @IsBoolean()
    public canSaveVariant: boolean;
}
