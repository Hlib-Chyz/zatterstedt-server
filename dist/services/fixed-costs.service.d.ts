import { ObjectId } from 'mongodb';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { FixedCost } from 'src/entities/fixed-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
export declare class FixedCostsService {
    private fixedCostsRepository;
    private readonly errorService;
    constructor(fixedCostsRepository: Repository<FixedCost>, errorService: ErrorService);
    getAll(): Promise<FixedCostDto[]>;
    create(fixedCost: CreateFixedCostDto): Promise<SuccessDto>;
    update(fixedCost: UpdateFixedCostDto): Promise<SuccessDto>;
    delete(_id: ObjectId): Promise<DeleteGetDto>;
}
