import { Expose, Transform, Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateInventoryDto {
    @Expose()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public totalCost: number;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public amount: number;
    @Expose()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
}

export class CreateInventoryDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public totalCost: number;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public amount: number;
    @Expose()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
}

export class InventoryDto {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public totalCost: number;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public amount: number;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public used: number;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public paid: number;
    @Expose()
    @IsNotEmpty()
    @IsDate()
    public date: Date;
}

export class SetUsedFieldDto {
    @Expose()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public used: number;
}
