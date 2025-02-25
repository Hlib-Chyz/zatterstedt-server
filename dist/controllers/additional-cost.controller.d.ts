import { AdditionalCostService } from '@services/additional-cost.service';
import { Response } from 'express';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
export declare class AdditionalCostController {
    private additionalCostService;
    constructor(additionalCostService: AdditionalCostService);
    update(additionalCost: UpdateAdditionalCostDto, res: Response): Promise<void>;
}
