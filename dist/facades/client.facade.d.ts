import { ClientDto } from '@dto/client.dto';
import { ClientsService } from '@services/clients.service';
import { ErrorService } from '@services/error.service';
import { OrdersService } from '@services/orders.service';
import { VariantFacade } from 'src/facades/variant.facade';
export declare class ClientFacade {
    private readonly variantFacade;
    private readonly errorService;
    private readonly clientsService;
    private readonly ordersService;
    constructor(
        variantFacade: VariantFacade,
        errorService: ErrorService,
        clientsService: ClientsService,
        ordersService: OrdersService
    );
    getAll(): Promise<ClientDto[]>;
}
