import { Expose, Transform } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
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
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public productId: Types.ObjectId;
}

export class UpdateDevelopmentCostDto {
    @Expose()
    @IsNotEmpty()
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
