import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    ManufacturingCostInventoryDto,
} from '@dto/manufacturing-cost.dto';
import { SuccessDto } from '@dto/shared.dto';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { OrderService } from '@services/order.service';
import { ObjectId } from 'mongodb';
export declare class ManufacturingCostFacade {
    private readonly errorService;
    private readonly inventoryService;
    private readonly orderService;
    private readonly manufacturingCostService;
    constructor(
        errorService: ErrorService,
        inventoryService: InventoryService,
        orderService: OrderService,
        manufacturingCostService: ManufacturingCostService
    );
    updateInventory(
        id: ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto>;
    canSaveInventory({ variantIds }: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto>;
    private changeInventoryAmount;
}
