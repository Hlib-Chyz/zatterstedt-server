import { Expose, Transform, Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateOtherCostDto {
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
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class CreateOtherCostDto {
    @Expose()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class OtherCostDto {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsDateString()
    public date: string;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}
