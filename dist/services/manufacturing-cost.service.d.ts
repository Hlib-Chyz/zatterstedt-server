import { Model, Types } from 'mongoose';
import { InventoryDto, ManufacturingCostJobDto } from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCostDocument } from 'src/schemas/manufacturing-cost.schema';
import { ErrorService } from './error.service';
export declare class ManufacturingCostService {
    private manufacturingCostModel;
    private readonly errorService;
    constructor(
        manufacturingCostModel: Model<ManufacturingCostDocument>,
        errorService: ErrorService
    );
    getByProductId(productId: Types.ObjectId): Promise<ManufacturingCostDocument>;
    getById(id: Types.ObjectId): Promise<ManufacturingCostDocument>;
    add(productId: Types.ObjectId): Promise<SuccessDto>;
    updateInventory(
        inventory: InventoryDto[],
        manufacturingCost: ManufacturingCostDocument
    ): Promise<ManufacturingCostDocument>;
    updateJob(id: Types.ObjectId, job: ManufacturingCostJobDto['job']): Promise<SuccessDto>;
}
