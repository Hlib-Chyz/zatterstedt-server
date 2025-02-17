import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsDate,
    IsDateString,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsString()
    public contact: string;
    @IsString()
    public clientName: string;
    @IsMongoId()
    @ValidateIf((_, value) => Boolean(value))
    public clientId: string;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantOrderDto)
    public variants: VariantOrderDto[];
}

export class OrderDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsDate()
    public date: Date;
    @IsNotEmpty()
    @IsString()
    public orderNumber: string;
    @IsNotEmpty()
    @IsString()
    public client: string;
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    public variants: string[];

    public constructor(partial: OrderDto) {
        Object.assign(this, partial);
    }
}

export class OrderVariantDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public clientId: string;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantOrderDto)
    public variants: VariantOrderDto[];
}

export class VariantOrderDto {
    @IsNotEmpty()
    @IsMongoId()
    public _id: Types.ObjectId;
    @IsNumber()
    @IsNotEmpty()
    public quantity: number;
    @IsNumber()
    @IsNotEmpty()
    public price: number;
}
