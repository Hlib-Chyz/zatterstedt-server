import { ObjectId } from 'mongodb';
import { Model, Types } from 'mongoose';
import { CreateClientContactsDto } from 'src/dto/client.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Client, ClientDocument } from 'src/schemas/client.schema';
import { ErrorService } from './error.service';
export declare class ClientService {
    private clientModel;
    private readonly errorService;
    constructor(clientModel: Model<Client>, errorService: ErrorService);
    add(client: CreateClientContactsDto): Promise<Types.ObjectId>;
    getById(id: ObjectId): Promise<ClientDocument>;
    updateContact(id: ObjectId, contact: string): Promise<SuccessDto>;
    getAll(): Promise<ClientDocument[]>;
}
