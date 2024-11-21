import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';

export class StockDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsMongoId()
    public variantId: string;
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
    public variantId: string;
    @IsNotEmpty()
    @IsNumber()
    public total: number;
    @IsNotEmpty()
    @IsNumber()
    public realizedParty: number;
}
