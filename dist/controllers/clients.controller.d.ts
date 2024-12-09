import { ObjectId } from 'mongodb';
import { ClientDto, UpdateClientContactsDto } from 'src/dto/client.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ClientsService } from 'src/services/clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    getAllClients(): Promise<ClientDto[]>;
    setContactsInfo(id: ObjectId, { contacts }: UpdateClientContactsDto): Promise<SuccessDto>;
}
