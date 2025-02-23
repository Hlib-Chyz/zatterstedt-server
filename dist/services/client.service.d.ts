import { Model, Types } from 'mongoose';
import { SuccessDto } from 'src/dto/shared.dto';
import { ClientDocument } from 'src/schemas/client.schema';
import { ErrorService } from './error.service';
export declare class ClientService {
    private clientModel;
    private readonly errorService;
    constructor(clientModel: Model<ClientDocument>, errorService: ErrorService);
    add(name: string, contact: string): Promise<Types.ObjectId>;
    getById(id: Types.ObjectId): Promise<ClientDocument>;
    updateContact(id: Types.ObjectId, contact: string): Promise<SuccessDto>;
    getAll(): Promise<ClientDocument[]>;
}
