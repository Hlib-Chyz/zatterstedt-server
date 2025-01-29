import { CreateOrderDto, OrderDto } from '@dto/order.dto';
import { SuccessDto } from '@dto/shared.dto';
import { ClientsService } from '@services/clients.service';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostsService } from '@services/manufacturing-costs.service';
import { OrdersService } from '@services/orders.service';
import { StockService } from '@services/stock.service';
import { VariantsService } from '@services/variants.service';
import { VariantFacade } from 'src/facades/variant.facade';
export declare class OrderFacade {
    private readonly errorService;
    private readonly stockService;
    private readonly inventoryService;
    private readonly clientsService;
    private readonly variantsService;
    private readonly variantFacade;
    private readonly ordersService;
    private readonly manufacturingCostsService;
    constructor(
        errorService: ErrorService,
        stockService: StockService,
        inventoryService: InventoryService,
        clientsService: ClientsService,
        variantsService: VariantsService,
        variantFacade: VariantFacade,
        ordersService: OrdersService,
        manufacturingCostsService: ManufacturingCostsService
    );
    getAll(): Promise<OrderDto[]>;
    add(order: CreateOrderDto): Promise<SuccessDto>;
}
