import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateInventoryDto {
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public totalCost: number;
    @IsNotEmpty()
    @IsNumber()
    public amount: number;
    @IsNotEmpty()
    @IsNumber()
    public used: number;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
}

export class CreateInventoryDto {
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public totalCost: number;
    @IsNotEmpty()
    @IsNumber()
    public amount: number;
    @IsNotEmpty()
    @IsNumber()
    public used: number;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
}

export class InventoryDto {
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public totalCost: number;
    @IsNotEmpty()
    @IsNumber()
    public amount: number;
    @IsNotEmpty()
    @IsNumber()
    public used: number;
    @IsNotEmpty()
    @IsNumber()
    public paid: number;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
}

export class SetUsedFieldDto {
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsNumber()
    public used: number;
}
