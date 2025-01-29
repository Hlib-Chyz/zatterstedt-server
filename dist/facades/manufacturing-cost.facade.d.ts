import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    ManufacturingCostInventoryDto,
} from '@dto/manufacturing-cost.dto';
import { SuccessDto } from '@dto/shared.dto';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostsService } from '@services/manufacturing-costs.service';
import { OrdersService } from '@services/orders.service';
import { ObjectId } from 'mongodb';
export declare class ManufacturingCostFacade {
    private readonly errorService;
    private readonly inventoryService;
    private readonly ordersService;
    private readonly manufacturingCostsService;
    constructor(
        errorService: ErrorService,
        inventoryService: InventoryService,
        ordersService: OrdersService,
        manufacturingCostsService: ManufacturingCostsService
    );
    addInventory(
        _id: ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto>;
    canSaveInventory({ variantIds }: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto>;
    private changeInventoryAmount;
}
