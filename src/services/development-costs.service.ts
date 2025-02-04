import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class DevelopmentCostsService {
    public constructor(
        @InjectRepository(DevelopmentCost)
        private developmentCostsRepository: Repository<DevelopmentCost>,
        private readonly errorService: ErrorService
    ) {}

    public async getByProductId(productId: ObjectId): Promise<DevelopmentCostDto[]> {
        try {
            return await this.developmentCostsRepository.find({
                where: { productId: productId.toString() },
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get development costs by productId');
            return [];
        }
    }

    public async add(developmentCost: CreateDevelopmentCostDto): Promise<SuccessDto> {
        try {
            await this.developmentCostsRepository.save(developmentCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add development cost');
            return { success: false };
        }
    }

    public async update(developmentCost: UpdateDevelopmentCostDto): Promise<SuccessDto> {
        try {
            const foundDevelopmentCost = await this.getDevelopmentCost(developmentCost._id);
            await this.developmentCostsRepository.save({
                ...foundDevelopmentCost,
                ...developmentCost,
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add development cost');
            return { success: false };
        }
    }

    public async delete(_id: ObjectId): Promise<DeleteGetDto> {
        try {
            const developmentCost = await this.getDevelopmentCost(_id);
            await this.developmentCostsRepository.remove(developmentCost);
            return { _id };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete development cost');
            return { _id };
        }
    }

    private async getDevelopmentCost(_id: ObjectId): Promise<DevelopmentCost> {
        const developmentCost = await this.developmentCostsRepository.findOne({
            where: { _id },
        });
        if (!developmentCost) {
            throw new NotFoundException('Development cost not found');
        }
        return developmentCost;
    }
}
