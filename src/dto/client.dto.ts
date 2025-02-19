import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ClientDto {
    @IsString()
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsString()
    @IsNotEmpty()
    public contact: string;
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    public purchases: string[];

    public constructor(partial: ClientDto) {
        Object.assign(this, partial);
    }
}

export class CreateClientContactsDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsString()
    @IsNotEmpty()
    public contact: string;
}

export class UpdateClientContactsDto {
    @IsString()
    @IsNotEmpty()
    public contact: string;
}
