import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class StockDto {
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public variantId: Types.ObjectId;
    @IsNotEmpty()
    @IsNumber()
    public sold: number;
    @IsNotEmpty()
    @IsNumber()
    public total: number;
    @IsNotEmpty()
    @IsNumber()
    public realizedParty: number;
}

export class CreateStockDto {
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public variantId: Types.ObjectId;
    @IsNotEmpty()
    @IsNumber()
    public total: number;
}

export class SetRealizedPartyDto {
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public variantId: Types.ObjectId;
    @IsNotEmpty()
    @IsNumber()
    public realizedParty: number;
}
