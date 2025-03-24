import { ClientDto } from '@dto/client.dto';
import { ClientService } from '@services/client.service';
import { ErrorService } from '@services/error.service';
import { OrderService } from '@services/order.service';
import { VariantFacade } from 'src/facades/variant.facade';
export declare class ClientFacade {
    private readonly variantFacade;
    private readonly errorService;
    private readonly clientService;
    private readonly orderService;
    constructor(
        variantFacade: VariantFacade,
        errorService: ErrorService,
        clientService: ClientService,
        orderService: OrderService
    );
    getAll(): Promise<ClientDto[]>;
}
