import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export class CreateFixedCostDto {
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class UpdateFixedCostDto {
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: ObjectId;
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class FixedCostDto {
    @IsString()
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsString()
    public name: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}
