import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { DevelopmentCost, DevelopmentCostDocument } from 'src/schemas/development-cost.schema';
import { ErrorService } from './error.service';

@Injectable()
export class DevelopmentCostService {
    public constructor(
        @InjectModel(DevelopmentCost.name)
        private developmentCostModel: Model<DevelopmentCostDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async getByProductId(productId: Types.ObjectId): Promise<DevelopmentCostDocument[]> {
        try {
            return await this.developmentCostModel.find({ productId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get development costs by productId');
            return [];
        }
    }

    public async add(developmentCost: CreateDevelopmentCostDto): Promise<void> {
        try {
            const createdDevelopmentCost = new this.developmentCostModel(developmentCost);
            await createdDevelopmentCost.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add development cost');
        }
    }

    public async update(developmentCost: UpdateDevelopmentCostDto): Promise<void> {
        try {
            const updatedDevelopmentCost = await this.developmentCostModel
                .findOneAndUpdate({ _id: developmentCost._id }, developmentCost)
                .exec();
            if (!updatedDevelopmentCost) {
                throw new NotFoundException('Development cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update development cost');
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            const result = await this.developmentCostModel.findOneAndDelete({ _id: id }).exec();
            if (!result) {
                throw new NotFoundException('Development cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete development cost');
        }
    }
}
