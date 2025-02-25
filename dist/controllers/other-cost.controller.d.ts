import { OtherCostService } from '@services/other-cost.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
export declare class OtherCostController {
    private readonly otherCostService;
    constructor(otherCostService: OtherCostService);
    getAll(): Promise<OtherCostDto[]>;
    add(otherCost: CreateOtherCostDto, res: Response): Promise<void>;
    update(otherCost: UpdateOtherCostDto, res: Response): Promise<void>;
    delete(id: Types.ObjectId, res: Response): Promise<void>;
}
