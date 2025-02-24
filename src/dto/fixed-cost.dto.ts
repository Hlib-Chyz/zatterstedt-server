import { Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateFixedCostDto {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class UpdateFixedCostDto {
    @Expose()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}

export class FixedCostDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    public _id: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public cost: number;
}
