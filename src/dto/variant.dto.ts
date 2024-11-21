import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';

export class VariantDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsString()
    public color: string;
    @IsNotEmpty()
    @IsString()
    public size: string;
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
}

export class CreateVariantDto {
    @IsNotEmpty()
    @IsString()
    public color: string;
    @IsNotEmpty()
    @IsString()
    public size: string;
    @IsNotEmpty()
    @IsMongoId()
    public productId: string;
}

export class VariantLockupDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsString()
    public name: string;
}
