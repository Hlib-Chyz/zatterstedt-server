import { ClientSession, Model, Types } from 'mongoose';
import { ClientDocument } from 'src/schemas/client.schema';
import { ErrorService } from './error.service';
export declare class ClientService {
    private clientModel;
    private readonly errorService;
    constructor(clientModel: Model<ClientDocument>, errorService: ErrorService);
    add(name: string, contact: string, session: ClientSession): Promise<Types.ObjectId>;
    getById(id: Types.ObjectId): Promise<ClientDocument>;
    updateContact(id: Types.ObjectId, contact: string): Promise<void>;
    getAll(): Promise<ClientDocument[]>;
}
