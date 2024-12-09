import { ObjectId } from 'mongodb';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { OtherCostsService } from 'src/services/other-costs.service';
export declare class OtherCostsController {
    private readonly otherCostsService;
    constructor(otherCostsService: OtherCostsService);
    getAll(): Promise<OtherCostDto[]>;
    create(otherCost: CreateOtherCostDto): Promise<SuccessDto>;
    update(fixedCost: UpdateOtherCostDto): Promise<SuccessDto>;
    delete(id: ObjectId): Promise<DeleteGetDto>;
}
