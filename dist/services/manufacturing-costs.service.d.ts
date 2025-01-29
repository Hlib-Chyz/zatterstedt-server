import { ObjectId } from 'mongodb';
import {
    CreateManufacturingCostDto,
    InventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCost } from 'src/entities/manufacturing-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
export declare class ManufacturingCostsService {
    private manufacturingCostsRepository;
    private readonly errorService;
    constructor(
        manufacturingCostsRepository: Repository<ManufacturingCost>,
        errorService: ErrorService
    );
    getByProductId(productId: ObjectId | string): Promise<ManufacturingCost>;
    create(manufacturingCost: CreateManufacturingCostDto): Promise<SuccessDto>;
    add(
        inventory: InventoryDto[],
        manufacturingCost: ManufacturingCost
    ): Promise<ManufacturingCost>;
    update(_id: ObjectId, job: ManufacturingCostJobDto['job']): Promise<SuccessDto>;
    getManufacturingCost(where: Partial<ManufacturingCost>): Promise<ManufacturingCost>;
}
