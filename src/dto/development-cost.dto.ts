import { Transform } from 'class-transformer';
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public productId: Types.ObjectId;
}

export class UpdateDevelopmentCostDto {
    @IsNotEmpty()
    @IsMongoId()
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
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public productId: Types.ObjectId;
}
