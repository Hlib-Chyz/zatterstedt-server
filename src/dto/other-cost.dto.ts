import { Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export class UpdateOtherCostDto {
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class CreateOtherCostDto {
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class OtherCostDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}
