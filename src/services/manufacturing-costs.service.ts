import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import {
    CreateManufacturingCostDto,
    InventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCost } from 'src/entities/manufacturing-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';

@Injectable()
export class ManufacturingCostsService {
    public constructor(
        @InjectRepository(ManufacturingCost)
        private manufacturingCostsRepository: Repository<ManufacturingCost>,
        private readonly errorService: ErrorService
    ) {}

    public async getByProductId(productId: ObjectId | string): Promise<ManufacturingCost> {
        try {
            const manufacturingCost = await this.getManufacturingCost({
                productId: productId.toString(),
            });
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by product id');
            return {} as ManufacturingCost;
        }
    }

    public async create(manufacturingCost: CreateManufacturingCostDto): Promise<SuccessDto> {
        try {
            await this.manufacturingCostsRepository.save({
                ...manufacturingCost,
                job: [],
                inventory: [],
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create manufacturing cost');
            return { success: false };
        }
    }

    public async add(
        inventory: InventoryDto[],
        manufacturingCost: ManufacturingCost
    ): Promise<ManufacturingCost> {
        try {
            return await this.manufacturingCostsRepository.save({
                ...manufacturingCost,
                inventory,
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add manufacturing cost');
            return {} as ManufacturingCost;
        }
    }

    public async update(_id: ObjectId, job: ManufacturingCostJobDto['job']): Promise<SuccessDto> {
        try {
            const manufacturingCost = await this.getManufacturingCost({ _id });
            await this.manufacturingCostsRepository.save({ ...manufacturingCost, job });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update manufacturing cost');
            return { success: false };
        }
    }

    public async getManufacturingCost(
        where: Partial<ManufacturingCost>
    ): Promise<ManufacturingCost> {
        try {
            const manufacturingCost = await this.manufacturingCostsRepository.findOne({
                where,
            });
            if (!manufacturingCost) {
                throw new NotFoundException('Manufacturing cost not found');
            }
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost');
            return {} as ManufacturingCost;
        }
    }
}
