import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UpdateInventoryDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => new ObjectId(value))
    public _id: ObjectId;
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
    public _id: ObjectId;
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
