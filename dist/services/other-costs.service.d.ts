import { ObjectId } from 'mongodb';
import { OtherCost } from 'src/entities/other-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
export declare class OtherCostsService {
    private otherCostsRepository;
    private readonly errorService;
    constructor(otherCostsRepository: Repository<OtherCost>, errorService: ErrorService);
    getAll(): Promise<OtherCostDto[]>;
    create(otherCost: CreateOtherCostDto): Promise<SuccessDto>;
    update(otherCost: UpdateOtherCostDto): Promise<SuccessDto>;
    delete(_id: ObjectId): Promise<DeleteGetDto>;
    private getOtherCost;
}
