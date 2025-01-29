import { ObjectId } from 'mongodb';
import { ClientDto, UpdateClientContactsDto } from 'src/dto/client.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ClientFacade } from 'src/facades/client.facade';
import { ClientsService } from 'src/services/clients.service';
export declare class ClientsController {
    private readonly clientsService;
    private readonly clientFacade;
    constructor(clientsService: ClientsService, clientFacade: ClientFacade);
    getAllClients(): Promise<ClientDto[]>;
    setContactsInfo(id: ObjectId, { contacts }: UpdateClientContactsDto): Promise<SuccessDto>;
}
