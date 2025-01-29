import { ObjectId } from 'mongodb';
import { ClientDto, CreateClientContactsDto } from 'src/dto/client.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Client } from 'src/entities/client.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
export declare class ClientsService {
    private clientsRepository;
    private readonly errorService;
    constructor(clientsRepository: Repository<Client>, errorService: ErrorService);
    getByClientId(clientId: string): Promise<Omit<ClientDto, 'purchases'>>;
    add(client: CreateClientContactsDto): Promise<ObjectId>;
    setContactsInfo(_id: ObjectId, contactsInfo: string): Promise<SuccessDto>;
    getAll(): Promise<Client[]>;
    private getClient;
}
