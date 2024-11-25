import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

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
