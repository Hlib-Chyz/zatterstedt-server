import { Model } from 'mongoose';
import { CreateAdditionalCostDto, UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { AdditionalCostDocument } from 'src/schemas/additional-cost.schema';
import { ErrorService } from './error.service';
import { ObjectId } from 'mongodb';
export declare class AdditionalCostService {
    private additionalCostModel;
    private readonly errorService;
    constructor(additionalCostModel: Model<AdditionalCostDocument>, errorService: ErrorService);
    update(additionalCost: UpdateAdditionalCostDto): Promise<SuccessDto>;
    add(additionalCost: CreateAdditionalCostDto): Promise<SuccessDto>;
    getByProductId(productId: ObjectId): Promise<AdditionalCostDocument>;
}
