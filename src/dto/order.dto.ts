import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsDateString,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsString()
    public contacts: string;
    @IsString()
    public clientName: string;
    @IsMongoId()
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
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public client: string;
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    public variants: string[];
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
    public _id: string;
    @IsNumber()
    @IsNotEmpty()
    public quantity: number;
    @IsNumber()
    @IsNotEmpty()
    public price: number;
}
