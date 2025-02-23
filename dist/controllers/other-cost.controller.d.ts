import { OtherCostService } from '@services/other-cost.service';
import { Types } from 'mongoose';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
export declare class OtherCostController {
    private readonly otherCostService;
    constructor(otherCostService: OtherCostService);
    getAll(): Promise<OtherCostDto[]>;
    add(otherCost: CreateOtherCostDto): Promise<SuccessDto>;
    update(otherCost: UpdateOtherCostDto): Promise<SuccessDto>;
    delete(id: Types.ObjectId): Promise<DeleteGetDto>;
}
