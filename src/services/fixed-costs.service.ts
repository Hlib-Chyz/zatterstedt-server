import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { FixedCost } from 'src/entities/fixed-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';

@Injectable()
export class FixedCostsService {
    public constructor(
        @InjectRepository(FixedCost) private fixedCostsRepository: Repository<FixedCost>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<FixedCostDto[]> {
        try {
            return await this.fixedCostsRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all fixed cost');
            return [];
        }
    }

    public async create(fixedCost: CreateFixedCostDto): Promise<SuccessDto> {
        try {
            await this.fixedCostsRepository.save(fixedCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create fixed cost');
            return { success: false };
        }
    }

    public async update(fixedCost: UpdateFixedCostDto): Promise<SuccessDto> {
        try {
            await this.getFixedCost(fixedCost._id);
            await this.fixedCostsRepository.save(fixedCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update fixed cost');
            return { success: false };
        }
    }

    public async delete(_id: ObjectId): Promise<DeleteGetDto> {
        try {
            const fixedCost = await this.getFixedCost(_id);
            await this.fixedCostsRepository.remove(fixedCost);
            return { _id };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete fixed cost');
            return { _id };
        }
    }

    private async getFixedCost(_id: ObjectId): Promise<FixedCost> {
        const fixedCost = await this.fixedCostsRepository.findOne({
            where: { _id },
        });
        if (!fixedCost) {
            throw new NotFoundException('Fixed cost not found');
        }
        return fixedCost;
    }
}
