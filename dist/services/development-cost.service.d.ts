import { Model, Types } from 'mongoose';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { DevelopmentCostDocument } from 'src/schemas/development-cost.schema';
import { ErrorService } from './error.service';
export declare class DevelopmentCostService {
    private developmentCostModel;
    private readonly errorService;
    constructor(developmentCostModel: Model<DevelopmentCostDocument>, errorService: ErrorService);
    getByProductId(productId: Types.ObjectId): Promise<DevelopmentCostDocument[]>;
    add(developmentCost: CreateDevelopmentCostDto): Promise<void>;
    update(developmentCost: UpdateDevelopmentCostDto): Promise<void>;
    delete(id: Types.ObjectId): Promise<void>;
}
