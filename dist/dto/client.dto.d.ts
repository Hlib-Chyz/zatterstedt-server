import { ObjectId } from 'mongodb';
export declare class ClientDto {
    _id: ObjectId;
    name: string;
    contact: string;
    purchases: string[];
    constructor(partial: ClientDto);
}
export declare class CreateClientContactsDto {
    name: string;
    contact: string;
}
export declare class UpdateClientContactsDto {
    contact: string;
}
