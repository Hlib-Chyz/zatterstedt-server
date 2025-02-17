import { ObjectId } from 'mongodb';
import { ClientDto, UpdateClientContactsDto } from 'src/dto/client.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ClientFacade } from 'src/facades/client.facade';
import { ClientService } from 'src/services/client.service';
export declare class ClientController {
    private readonly clientService;
    private readonly clientFacade;
    constructor(clientService: ClientService, clientFacade: ClientFacade);
    getAll(): Promise<ClientDto[]>;
    updateContact(id: ObjectId, { contact }: UpdateClientContactsDto): Promise<SuccessDto>;
}
