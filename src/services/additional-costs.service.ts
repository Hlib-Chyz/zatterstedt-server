import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { AdditionalCost } from 'src/entities/additional-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { CreateAdditionalCostDto, UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';

@Injectable()
export class AdditionalCostsService {
    public constructor(
        @InjectRepository(AdditionalCost)
        private additionalCostsRepository: Repository<AdditionalCost>,
        private readonly errorService: ErrorService
    ) {}

    public async update(additionalCost: UpdateAdditionalCostDto): Promise<SuccessDto> {
        try {
            const existingAdditionalCost = await this.additionalCostsRepository.findOne({
                where: { _id: additionalCost._id },
            });
            if (!existingAdditionalCost) {
                throw new NotFoundException('Additional cost not found');
            }
            await this.additionalCostsRepository.save(additionalCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update additional cost');
            return { success: false };
        }
    }

    public async addOne(additionalCost: CreateAdditionalCostDto): Promise<SuccessDto> {
        try {
            await this.additionalCostsRepository.save(additionalCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add additional cost');
            return { success: false };
        }
    }

    public async getAdditionalCostByProductId(productId: ObjectId): Promise<AdditionalCost> {
        try {
            const additionalCost = await this.additionalCostsRepository.findOne({
                where: { productId: productId.toString() },
            });
            if (!additionalCost) {
                throw new NotFoundException('Additional cost not found');
            }
            return additionalCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get additional cost by product id');
            return {} as AdditionalCost;
        }
    }
}
