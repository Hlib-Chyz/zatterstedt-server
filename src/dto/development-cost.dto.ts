import { Transform } from 'class-transformer';
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export class CreateDevelopmentCostDto {
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public description: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
}

export class UpdateDevelopmentCostDto {
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public description: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class DevelopmentCostDto {
    @IsString()
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @IsNotEmpty()
    @IsString()
    public description: string;
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
}
