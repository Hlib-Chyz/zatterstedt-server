import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import {
    CreateManufacturingCostDto,
    InventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import {
    ManufacturingCost,
    ManufacturingCostDocument,
} from 'src/schemas/manufacturing-cost.schema';
import { ErrorService } from './error.service';
export declare class ManufacturingCostService {
    private manufacturingCostModel;
    private readonly errorService;
    constructor(manufacturingCostModel: Model<ManufacturingCost>, errorService: ErrorService);
    getByProductId(productId: ObjectId): Promise<ManufacturingCostDocument>;
    getById(id: ObjectId): Promise<ManufacturingCost>;
    add(manufacturingCost: CreateManufacturingCostDto): Promise<SuccessDto>;
    updateInventory(
        inventory: InventoryDto[],
        manufacturingCost: ManufacturingCost
    ): Promise<ManufacturingCost>;
    updateJob(id: ObjectId, job: ManufacturingCostJobDto['job']): Promise<SuccessDto>;
}
