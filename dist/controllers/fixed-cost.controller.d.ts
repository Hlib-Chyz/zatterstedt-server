import { FixedCost } from '@schemas/fixed-cost.schema';
import { FixedCostService } from '@services/fixed-cost.service';
import { ObjectId } from 'mongodb';
import { CreateFixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
export declare class FixedCostController {
    private readonly fixedCostService;
    constructor(fixedCostService: FixedCostService);
    getAll(): Promise<FixedCost[]>;
    add(fixedCost: CreateFixedCostDto): Promise<SuccessDto>;
    update(fixedCost: UpdateFixedCostDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
