import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UpdateAdditionalCostDto {
    @IsNotEmpty()
    @Transform(({ value }) => new ObjectId(value))
    public _id: ObjectId;
    @IsNumber()
    @IsNotEmpty()
    public cost: number;
}

export class CreateAdditionalCostDto {
    @IsMongoId()
    @IsNotEmpty()
    public productId: string;
}
