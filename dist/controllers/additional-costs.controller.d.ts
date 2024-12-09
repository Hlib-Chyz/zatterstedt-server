import { SuccessDto } from '@dto/shared.dto';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { AdditionalCostsService } from 'src/services/additional-costs.service';
export declare class AdditionalCostsController {
    private additionalCostsService;
    constructor(additionalCostsService: AdditionalCostsService);
    change(additionalCost: UpdateAdditionalCostDto): Promise<SuccessDto>;
}
