import { Expose } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ClientDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public name: string;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public contact: string;
    @Expose()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    public purchases: string[];
}

export class UpdateClientContactDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public contact: string;
}
