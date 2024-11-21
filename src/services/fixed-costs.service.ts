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
            const foundFixedCost = await this.fixedCostsRepository.findOne({
                where: { _id: fixedCost._id },
            });
            if (!foundFixedCost) {
                throw new NotFoundException('Fixed cost not found');
            }
            await this.fixedCostsRepository.save(fixedCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update fixed cost');
            return { success: false };
        }
    }

    public async delete(_id: ObjectId): Promise<DeleteGetDto> {
        try {
            await this.fixedCostsRepository.delete({ _id });
            return { _id };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete cost field');
            return { _id };
        }
    }
}
