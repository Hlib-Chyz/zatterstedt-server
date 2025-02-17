import { DeleteGetDto, SuccessDto } from '@dto/shared.dto';
import { ObjectId } from 'mongodb';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { DevelopmentCostService } from '@services/development-cost.service';
export declare class DevelopmentCostController {
    private readonly developmentCostService;
    constructor(developmentCostService: DevelopmentCostService);
    add(developmentCost: CreateDevelopmentCostDto): Promise<SuccessDto>;
    update(developmentCost: UpdateDevelopmentCostDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
