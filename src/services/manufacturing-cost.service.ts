import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import {
    CreateManufacturingCostDto,
    InventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import {
    ManufacturingCost,
    ManufacturingCostDocument,
} from 'src/schemas/manufacturing-cost.schema';
import { ErrorService } from './error.service';

@Injectable()
export class ManufacturingCostService {
    public constructor(
        @InjectModel(ManufacturingCost.name)
        private manufacturingCostModel: Model<ManufacturingCost>,
        private readonly errorService: ErrorService
    ) {}

    public async getByProductId(productId: ObjectId): Promise<ManufacturingCostDocument> {
        try {
            const manufacturingCost = await this.manufacturingCostModel
                .findOne({
                    productId,
                })
                .exec();
            if (!manufacturingCost) {
                throw new NotFoundException('Manufacturing cost not found');
            }
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by product id');
            return {} as ManufacturingCostDocument;
        }
    }

    public async getById(id: ObjectId): Promise<ManufacturingCost> {
        try {
            const manufacturingCost = await this.manufacturingCostModel.findById(id).exec();
            if (!manufacturingCost) {
                throw new NotFoundException('Manufacturing cost not found');
            }
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by id');
            return {} as ManufacturingCost;
        }
    }

    public async add(manufacturingCost: CreateManufacturingCostDto): Promise<SuccessDto> {
        try {
            const createdManufacturingCost = new this.manufacturingCostModel(manufacturingCost);
            await createdManufacturingCost.save();
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create manufacturing cost');
            return new SuccessDto({ success: false });
        }
    }

    public async updateInventory(
        inventory: InventoryDto[],
        manufacturingCost: ManufacturingCost
    ): Promise<ManufacturingCost> {
        try {
            const updatedManufacturingCost = await this.manufacturingCostModel
                .findByIdAndUpdate(manufacturingCost, { inventory })
                .exec();
            if (!updatedManufacturingCost) {
                throw new NotFoundException('Manufacturing cost not found');
            }
            return updatedManufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add manufacturing cost');
            return {} as ManufacturingCost;
        }
    }

    public async updateJob(id: ObjectId, job: ManufacturingCostJobDto['job']): Promise<SuccessDto> {
        try {
            const result = await this.manufacturingCostModel.findByIdAndUpdate(id, { job }).exec();
            if (!result) {
                throw new NotFoundException('Fixed cost not found');
            }
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update manufacturing cost');
            return new SuccessDto({ success: false });
        }
    }
}
