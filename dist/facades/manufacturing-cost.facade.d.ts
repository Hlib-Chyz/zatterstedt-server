import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    ManufacturingCostInventoryDto,
} from '@dto/manufacturing-cost.dto';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { OrderService } from '@services/order.service';
import { Types } from 'mongoose';
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
        id: Types.ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<void>;
    canSaveInventory({ variantIds }: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto>;
    private changeInventoryAmount;
}
