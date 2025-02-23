import { DeleteGetDto, SuccessDto } from '@dto/shared.dto';
import { DevelopmentCostService } from '@services/development-cost.service';
import { Types } from 'mongoose';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
export declare class DevelopmentCostController {
    private readonly developmentCostService;
    constructor(developmentCostService: DevelopmentCostService);
    add(developmentCost: CreateDevelopmentCostDto): Promise<SuccessDto>;
    update(developmentCost: UpdateDevelopmentCostDto): Promise<SuccessDto>;
    delete(id: Types.ObjectId): Promise<DeleteGetDto>;
}
