import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { InventoryDto, ManufacturingCostJobDto } from 'src/dto/manufacturing-cost.dto';
import {
    ManufacturingCost,
    ManufacturingCostDocument,
} from 'src/schemas/manufacturing-cost.schema';
import { ErrorService } from './error.service';

@Injectable()
export class ManufacturingCostService {
    public constructor(
        @InjectModel(ManufacturingCost.name)
        private manufacturingCostModel: Model<ManufacturingCostDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async getByProductId(productId: Types.ObjectId): Promise<ManufacturingCostDocument> {
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

    public async getById(id: Types.ObjectId): Promise<ManufacturingCostDocument> {
        try {
            const manufacturingCost = await this.manufacturingCostModel.findById(id).exec();
            if (!manufacturingCost) {
                throw new NotFoundException('Manufacturing cost not found');
            }
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by id');
            return {} as ManufacturingCostDocument;
        }
    }

    public async add(productId: Types.ObjectId, session: ClientSession): Promise<void> {
        try {
            const createdManufacturingCost = new this.manufacturingCostModel({ productId });
            createdManufacturingCost.$session(session);
            await createdManufacturingCost.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create manufacturing cost');
        }
    }

    public async updateInventory(
        inventory: InventoryDto[],
        id: Types.ObjectId,
        session: ClientSession
    ): Promise<ManufacturingCostDocument> {
        try {
            const updatedManufacturingCost = await this.manufacturingCostModel
                .findByIdAndUpdate(id, { inventory })
                .session(session)
                .exec();
            if (!updatedManufacturingCost) {
                throw new NotFoundException('Manufacturing cost not found');
            }
            return updatedManufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add manufacturing cost');
            return {} as ManufacturingCostDocument;
        }
    }

    public async updateJob(id: Types.ObjectId, job: ManufacturingCostJobDto['job']): Promise<void> {
        try {
            const result = await this.manufacturingCostModel.findByIdAndUpdate(id, { job }).exec();
            if (!result) {
                throw new NotFoundException('Fixed cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update manufacturing cost');
        }
    }
}
