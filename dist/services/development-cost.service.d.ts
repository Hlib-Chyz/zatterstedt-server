import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { DevelopmentCost, DevelopmentCostDocument } from 'src/schemas/development-cost.schema';
import { ErrorService } from './error.service';
export declare class DevelopmentCostService {
    private developmentCostModel;
    private readonly errorService;
    constructor(developmentCostModel: Model<DevelopmentCost>, errorService: ErrorService);
    getByProductId(productId: ObjectId): Promise<DevelopmentCostDocument[]>;
    add(developmentCost: CreateDevelopmentCostDto): Promise<SuccessDto>;
    update(developmentCost: UpdateDevelopmentCostDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
