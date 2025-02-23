import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { Types } from 'mongoose';
import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    ManufacturingCostInventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCostFacade } from 'src/facades/manufacturing-cost.facade';
export declare class ManufacturingCostController {
    private readonly manufacturingCostService;
    private readonly manufacturingCostFacade;
    constructor(
        manufacturingCostService: ManufacturingCostService,
        manufacturingCostFacade: ManufacturingCostFacade
    );
    updateJob(id: Types.ObjectId, { job }: ManufacturingCostJobDto): Promise<SuccessDto>;
    updateInventory(
        id: Types.ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto>;
    canSaveInventory(body: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto>;
}
