import { ObjectId } from 'mongodb';
import { ClientDto, CreateClientContactsDto } from 'src/dto/client.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Client } from 'src/entities/client.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { Order } from '@entities/order.entity';
import { VariantsService } from '@services/variants.service';
export declare class ClientsService {
    private clientsRepository;
    private ordersRepository;
    private readonly variantsService;
    private readonly errorService;
    constructor(clientsRepository: Repository<Client>, ordersRepository: Repository<Order>, variantsService: VariantsService, errorService: ErrorService);
    getAll(): Promise<ClientDto[]>;
    getByClientId(clientId: string): Promise<Omit<ClientDto, 'purchases'>>;
    add(client: CreateClientContactsDto): Promise<ObjectId>;
    setContactsInfo(_id: ObjectId, contactsInfo: string): Promise<SuccessDto>;
}
