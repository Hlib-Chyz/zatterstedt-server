import { Model, Types } from 'mongoose';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { AdditionalCostDocument } from 'src/schemas/additional-cost.schema';
import { ErrorService } from './error.service';
export declare class AdditionalCostService {
    private additionalCostModel;
    private readonly errorService;
    constructor(additionalCostModel: Model<AdditionalCostDocument>, errorService: ErrorService);
    update(additionalCost: UpdateAdditionalCostDto): Promise<SuccessDto>;
    add(productId: Types.ObjectId): Promise<SuccessDto>;
    getByProductId(productId: Types.ObjectId): Promise<AdditionalCostDocument>;
}
