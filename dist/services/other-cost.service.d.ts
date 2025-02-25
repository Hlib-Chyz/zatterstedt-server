import { Model, Types } from 'mongoose';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { OtherCostDocument } from 'src/schemas/other-cost.schema';
import { ErrorService } from './error.service';
export declare class OtherCostService {
    private otherCostModel;
    private readonly errorService;
    constructor(otherCostModel: Model<OtherCostDocument>, errorService: ErrorService);
    getAll(): Promise<OtherCostDto[]>;
    add(otherCost: CreateOtherCostDto): Promise<void>;
    update(otherCost: UpdateOtherCostDto): Promise<void>;
    delete(id: Types.ObjectId): Promise<void>;
}
