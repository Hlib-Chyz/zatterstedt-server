import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class ClientDto {
    @IsString()
    @IsNotEmpty()
    public _id: ObjectId;
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsString()
    @IsNotEmpty()
    public contacts: string;
    @IsString()
    @IsNotEmpty()
    public purchases: string;
}

export class CreateClientContactsDto {
    @IsString()
    @IsNotEmpty()
    public name: string;
    @IsString()
    @IsNotEmpty()
    public contacts: string;
    @IsString()
    @IsNotEmpty()
    public purchases: string;
}

export class UpdateClientContactsDto {
    @IsString()
    @IsNotEmpty()
    public contacts: string;
}
