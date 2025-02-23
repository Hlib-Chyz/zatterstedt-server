import { FixedCostService } from '@services/fixed-cost.service';
import { Types } from 'mongoose';
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
export declare class FixedCostController {
    private readonly fixedCostService;
    constructor(fixedCostService: FixedCostService);
    getAll(): Promise<FixedCostDto[]>;
    add(fixedCost: CreateFixedCostDto): Promise<SuccessDto>;
    update(fixedCost: UpdateFixedCostDto): Promise<SuccessDto>;
    delete(id: Types.ObjectId): Promise<DeleteGetDto>;
}
