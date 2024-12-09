import { ObjectId } from 'mongodb';
import { CanSaveInventoryDto, CanSaveInventoryResponseDto, ManufacturingCostInventoryDto, ManufacturingCostJobDto } from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCostsService } from 'src/services/manufacturing-costs.service';
export declare class ManufacturingCostsController {
    private readonly manufacturingCostsService;
    constructor(manufacturingCostsService: ManufacturingCostsService);
    changeJobCost(id: ObjectId, { job }: ManufacturingCostJobDto): Promise<SuccessDto>;
    addInventory(id: ObjectId, manufacturingCostInventory: ManufacturingCostInventoryDto): Promise<SuccessDto>;
    canSaveInventory(body: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto>;
}
