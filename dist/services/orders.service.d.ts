import { ManufacturingCost } from '@entities/manufacturing-cost.entity';
import { CreateOrderDto, OrderDto, OrderVariantDto } from 'src/dto/order.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { ErrorService } from './error.service';
import { InventoryService } from './inventory.service';
import { StockService } from './stock.service';
import { VariantsService } from './variants.service';
export declare class OrdersService {
    private ordersRepository;
    private manufacturingCostsRepository;
    private readonly errorService;
    private readonly stockService;
    private readonly inventoryService;
    private readonly clientsService;
    private readonly variantsService;
    constructor(ordersRepository: Repository<Order>, manufacturingCostsRepository: Repository<ManufacturingCost>, errorService: ErrorService, stockService: StockService, inventoryService: InventoryService, clientsService: ClientsService, variantsService: VariantsService);
    getAll(): Promise<OrderDto[]>;
    getByVariantId(variantId: string): Promise<OrderVariantDto[]>;
    add(order: CreateOrderDto): Promise<SuccessDto>;
}
