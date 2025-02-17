import { ObjectId } from 'mongodb';
import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    ManufacturingCostInventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCostFacade } from 'src/facades/manufacturing-cost.facade';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
export declare class ManufacturingCostController {
    private readonly manufacturingCostService;
    private readonly manufacturingCostFacade;
    constructor(
        manufacturingCostService: ManufacturingCostService,
        manufacturingCostFacade: ManufacturingCostFacade
    );
    updateJob(id: ObjectId, { job }: ManufacturingCostJobDto): Promise<SuccessDto>;
    updateInventory(
        id: ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto>;
    canSaveInventory(body: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto>;
}
