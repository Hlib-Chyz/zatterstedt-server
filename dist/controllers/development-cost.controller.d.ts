import { DevelopmentCostService } from '@services/development-cost.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
export declare class DevelopmentCostController {
    private readonly developmentCostService;
    constructor(developmentCostService: DevelopmentCostService);
    add(developmentCost: CreateDevelopmentCostDto, res: Response): Promise<void>;
    update(developmentCost: UpdateDevelopmentCostDto, res: Response): Promise<void>;
    delete(id: Types.ObjectId, res: Response): Promise<void>;
}
