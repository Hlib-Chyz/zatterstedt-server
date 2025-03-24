import { CreateOrderDto, OrderDto } from '@dto/order.dto';
import { ClientService } from '@services/client.service';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { OrderService } from '@services/order.service';
import { StockService } from '@services/stock.service';
import { VariantService } from '@services/variant.service';
import { Connection } from 'mongoose';
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
    private readonly connection;
    constructor(
        errorService: ErrorService,
        stockService: StockService,
        inventoryService: InventoryService,
        clientService: ClientService,
        variantService: VariantService,
        variantFacade: VariantFacade,
        orderService: OrderService,
        manufacturingCostService: ManufacturingCostService,
        connection: Connection
    );
    getAll(): Promise<OrderDto[]>;
    add(order: CreateOrderDto): Promise<void>;
}
