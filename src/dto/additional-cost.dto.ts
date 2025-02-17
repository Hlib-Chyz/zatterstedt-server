import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateAdditionalCostDto {
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public _id: Types.ObjectId;
    @IsNumber()
    @IsNotEmpty()
    public cost: number;
}

export class CreateAdditionalCostDto {
    @IsMongoId()
    @IsNotEmpty()
    public productId: Types.ObjectId;
}
