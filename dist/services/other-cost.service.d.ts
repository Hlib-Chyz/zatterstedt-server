import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateOtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { OtherCost } from 'src/schemas/other-cost.schema';
import { ErrorService } from './error.service';
export declare class OtherCostService {
    private otherCostModel;
    private readonly errorService;
    constructor(otherCostModel: Model<OtherCost>, errorService: ErrorService);
    getAll(): Promise<OtherCost[]>;
    add(otherCost: CreateOtherCostDto): Promise<SuccessDto>;
    update(otherCost: UpdateOtherCostDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
