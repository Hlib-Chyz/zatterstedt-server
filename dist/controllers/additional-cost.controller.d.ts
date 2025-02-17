import { SuccessDto } from '@dto/shared.dto';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { AdditionalCostService } from '@services/additional-cost.service';
export declare class AdditionalCostController {
    private additionalCostService;
    constructor(additionalCostService: AdditionalCostService);
    update(additionalCost: UpdateAdditionalCostDto): Promise<SuccessDto>;
}
