import { InventoryService } from '@services/inventory.service';
import { OrdersService } from '@services/orders.service';
import { ObjectId } from 'mongodb';
import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    CreateManufacturingCostDto,
    ManufacturingCostInventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCost } from 'src/entities/manufacturing-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
export declare class ManufacturingCostsService {
    private manufacturingCostsRepository;
    private readonly errorService;
    private readonly inventoryService;
    private readonly ordersService;
    constructor(
        manufacturingCostsRepository: Repository<ManufacturingCost>,
        errorService: ErrorService,
        inventoryService: InventoryService,
        ordersService: OrdersService
    );
    getByProductId(productId: ObjectId | string): Promise<ManufacturingCost>;
    create(manufacturingCost: CreateManufacturingCostDto): Promise<SuccessDto>;
    update(_id: ObjectId, job: ManufacturingCostJobDto['job']): Promise<SuccessDto>;
    addInventory(
        _id: ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto>;
    canSaveInventory({ variantIds }: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto>;
    private changeInventoryAmount;
    private getManufacturingCost;
}
