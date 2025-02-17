import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { DevelopmentCost, DevelopmentCostDocument } from 'src/schemas/development-cost.schema';
import { ErrorService } from './error.service';

@Injectable()
export class DevelopmentCostService {
    public constructor(
        @InjectModel(DevelopmentCost.name) private developmentCostModel: Model<DevelopmentCost>,
        private readonly errorService: ErrorService
    ) {}

    public async getByProductId(productId: ObjectId): Promise<DevelopmentCostDocument[]> {
        try {
            return await this.developmentCostModel.find({ productId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get development costs by productId');
            return [];
        }
    }

    public async add(developmentCost: CreateDevelopmentCostDto): Promise<SuccessDto> {
        try {
            const createdDevelopmentCost = new this.developmentCostModel(developmentCost);
            await createdDevelopmentCost.save();
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add development cost');
            return { success: false };
        }
    }

    public async update(developmentCost: UpdateDevelopmentCostDto): Promise<SuccessDto> {
        try {
            const updatedDevelopmentCost = await this.developmentCostModel
                .findByIdAndUpdate(developmentCost._id, developmentCost)
                .exec();
            if (!updatedDevelopmentCost) {
                throw new NotFoundException('Development cost not found');
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update development cost');
            return { success: false };
        }
    }

    public async delete(id: ObjectId): Promise<DeleteGetDto> {
        try {
            const result = await this.developmentCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Development cost not found');
            }
            return { id };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete development cost');
            return { id };
        }
    }
}
