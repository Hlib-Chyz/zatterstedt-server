import { ObjectId } from 'mongodb';
export declare class ClientDto {
    _id: ObjectId;
    name: string;
    contacts: string;
    purchases: string[];
}
export declare class CreateClientContactsDto {
    name: string;
    contacts: string;
}
export declare class UpdateClientContactsDto {
    contacts: string;
}
