import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    ManufacturingCostInventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { ManufacturingCostFacade } from 'src/facades/manufacturing-cost.facade';
export declare class ManufacturingCostController {
    private readonly manufacturingCostService;
    private readonly manufacturingCostFacade;
    constructor(
        manufacturingCostService: ManufacturingCostService,
        manufacturingCostFacade: ManufacturingCostFacade
    );
    updateJob(id: Types.ObjectId, { job }: ManufacturingCostJobDto, res: Response): Promise<void>;
    updateInventory(
        id: Types.ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto,
        res: Response
    ): Promise<void>;
    canSaveInventory(body: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto>;
}
