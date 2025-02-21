import { Expose, Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class SetRealizedPartyDto {
    @Expose()
    @IsNotEmpty()
    @IsMongoId()
    @Transform(({ value }: { value: string }) => new Types.ObjectId(value))
    public variantId: Types.ObjectId;
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public realizedParty: number;
}
