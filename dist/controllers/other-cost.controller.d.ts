import { OtherCost } from '@schemas/other-cost.schema';
import { OtherCostService } from '@services/other-cost.service';
import { ObjectId } from 'mongodb';
import { CreateOtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
export declare class OtherCostController {
    private readonly otherCostService;
    constructor(otherCostService: OtherCostService);
    getAll(): Promise<OtherCost[]>;
    add(otherCost: CreateOtherCostDto): Promise<SuccessDto>;
    update(fixedCost: UpdateOtherCostDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
