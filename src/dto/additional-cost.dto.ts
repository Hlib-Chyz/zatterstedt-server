import { Transform } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAdditionalCostDto {
    @IsString()
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
