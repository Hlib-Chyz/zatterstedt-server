import { Types } from 'mongoose';
export declare class ClientDto {
    _id: Types.ObjectId;
    name: string;
    contact: string;
    purchases: string[];
}
export declare class UpdateClientContactDto {
    contact: string;
}
