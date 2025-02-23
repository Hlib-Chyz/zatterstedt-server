import { Model, Types } from 'mongoose';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { OtherCostDocument } from 'src/schemas/other-cost.schema';
import { ErrorService } from './error.service';
export declare class OtherCostService {
    private otherCostModel;
    private readonly errorService;
    constructor(otherCostModel: Model<OtherCostDocument>, errorService: ErrorService);
    getAll(): Promise<OtherCostDto[]>;
    add(otherCost: CreateOtherCostDto): Promise<SuccessDto>;
    update(otherCost: UpdateOtherCostDto): Promise<SuccessDto>;
    delete(id: Types.ObjectId): Promise<DeleteGetDto>;
}
