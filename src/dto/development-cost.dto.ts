import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDevelopmentCostDto {
    @Expose()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public description: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
    @Expose()
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public productId: Types.ObjectId;
}

export class UpdateDevelopmentCostDto {
    @Expose()
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public description: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}
