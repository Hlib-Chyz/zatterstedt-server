import { CreateOrderDto, OrderDto } from '@dto/order.dto';
import { SuccessDto } from '@dto/shared.dto';
import { ClientService } from '@services/client.service';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { OrderService } from '@services/order.service';
import { StockService } from '@services/stock.service';
import { VariantService } from '@services/variant.service';
import { VariantFacade } from 'src/facades/variant.facade';
export declare class OrderFacade {
    private readonly errorService;
    private readonly stockService;
    private readonly inventoryService;
    private readonly clientService;
    private readonly variantService;
    private readonly variantFacade;
    private readonly orderService;
    private readonly manufacturingCostService;
    constructor(
        errorService: ErrorService,
        stockService: StockService,
        inventoryService: InventoryService,
        clientService: ClientService,
        variantService: VariantService,
        variantFacade: VariantFacade,
        orderService: OrderService,
        manufacturingCostService: ManufacturingCostService
    );
    getAll(): Promise<OrderDto[]>;
    add(order: CreateOrderDto): Promise<SuccessDto>;
}
