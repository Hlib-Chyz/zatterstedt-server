import { ObjectId } from 'mongodb';
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { FixedCostsService } from 'src/services/fixed-costs.service';
export declare class FixedCostsController {
    private readonly fixedCostsService;
    constructor(fixedCostsService: FixedCostsService);
    getAll(): Promise<FixedCostDto[]>;
    create(fixedCost: CreateFixedCostDto): Promise<SuccessDto>;
    update(fixedCost: UpdateFixedCostDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
