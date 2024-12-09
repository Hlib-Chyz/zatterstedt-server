import { DeleteGetDto, SuccessDto } from '@dto/shared.dto';
import { ObjectId } from 'mongodb';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { DevelopmentCostsService } from 'src/services/development-costs.service';
export declare class DevelopmentCostsController {
    private readonly developmentCostsService;
    constructor(developmentCostsService: DevelopmentCostsService);
    add(developmentCost: CreateDevelopmentCostDto): Promise<SuccessDto>;
    update(developmentCost: UpdateDevelopmentCostDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
