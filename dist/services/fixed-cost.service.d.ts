import { Model, Types } from 'mongoose';
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { FixedCostDocument } from 'src/schemas/fixed-cost.schema';
import { ErrorService } from './error.service';
export declare class FixedCostService {
    private fixedCostModel;
    private readonly errorService;
    constructor(fixedCostModel: Model<FixedCostDocument>, errorService: ErrorService);
    getAll(): Promise<FixedCostDto[]>;
    add(fixedCost: CreateFixedCostDto): Promise<SuccessDto>;
    update(fixedCost: UpdateFixedCostDto): Promise<SuccessDto>;
    delete(id: Types.ObjectId): Promise<DeleteGetDto>;
}
