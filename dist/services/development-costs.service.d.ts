import { ObjectId } from 'mongodb';
import { DevelopmentCost } from 'src/entities/development-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import {
    CreateDevelopmentCostDto,
    DevelopmentCostDto,
    UpdateDevelopmentCostDto,
} from 'src/dto/development-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
export declare class DevelopmentCostsService {
    private developmentCostsRepository;
    private readonly errorService;
    constructor(
        developmentCostsRepository: Repository<DevelopmentCost>,
        errorService: ErrorService
    );
    getByProductId(productId: ObjectId): Promise<DevelopmentCostDto[]>;
    add(developmentCost: CreateDevelopmentCostDto): Promise<SuccessDto>;
    update(developmentCost: UpdateDevelopmentCostDto): Promise<SuccessDto>;
    delete(_id: ObjectId): Promise<DeleteGetDto>;
    private getDevelopmentCost;
}
