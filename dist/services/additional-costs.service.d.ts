import { ObjectId } from 'mongodb';
import { AdditionalCost } from 'src/entities/additional-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { CreateAdditionalCostDto, UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
export declare class AdditionalCostsService {
    private additionalCostsRepository;
    private readonly errorService;
    constructor(additionalCostsRepository: Repository<AdditionalCost>, errorService: ErrorService);
    update(additionalCost: UpdateAdditionalCostDto): Promise<SuccessDto>;
    addOne(additionalCost: CreateAdditionalCostDto): Promise<SuccessDto>;
    getAdditionalCostByProductId(productId: ObjectId): Promise<AdditionalCost>;
}
