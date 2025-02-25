import { FixedCostService } from '@services/fixed-cost.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
export declare class FixedCostController {
    private readonly fixedCostService;
    constructor(fixedCostService: FixedCostService);
    getAll(): Promise<FixedCostDto[]>;
    add(fixedCost: CreateFixedCostDto, res: Response): Promise<void>;
    update(fixedCost: UpdateFixedCostDto, res: Response): Promise<void>;
    delete(id: Types.ObjectId, res: Response): Promise<void>;
}
