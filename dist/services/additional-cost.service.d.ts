import { ClientSession, Model, Types } from 'mongoose';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { AdditionalCostDocument } from 'src/schemas/additional-cost.schema';
import { ErrorService } from './error.service';
export declare class AdditionalCostService {
    private additionalCostModel;
    private readonly errorService;
    constructor(additionalCostModel: Model<AdditionalCostDocument>, errorService: ErrorService);
    update(additionalCost: UpdateAdditionalCostDto): Promise<void>;
    add(productId: Types.ObjectId, session: ClientSession): Promise<void>;
    getByProductId(productId: Types.ObjectId): Promise<AdditionalCostDocument>;
}
