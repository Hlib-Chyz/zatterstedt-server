import { Expose, Transform, Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsDate,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsString()
    public contact: string;
    @IsString()
    public clientName: string;
    @ValidateIf((_, value) => Boolean(value))
    @Transform(({ value }: { value: string }) => (value ? new Types.ObjectId(value) : null))
    public clientId: Types.ObjectId | null;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantOrderDto)
    public variants: VariantOrderDto[];
}

export class VariantOrderDto {
    @Expose()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public quantity: number;
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    public price: number;
}

export class OrderDto {
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
    @IsString()
    public orderNumber: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public client: string;
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    public variants: string[];
}
