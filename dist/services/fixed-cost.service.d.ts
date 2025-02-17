import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateFixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { FixedCost } from 'src/schemas/fixed-cost.schema';
import { ErrorService } from './error.service';
export declare class FixedCostService {
    private fixedCostModel;
    private readonly errorService;
    constructor(fixedCostModel: Model<FixedCost>, errorService: ErrorService);
    getAll(): Promise<FixedCost[]>;
    add(fixedCost: CreateFixedCostDto): Promise<SuccessDto>;
    update(fixedCost: UpdateFixedCostDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
