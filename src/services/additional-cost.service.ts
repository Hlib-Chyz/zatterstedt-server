import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdditionalCostDto, UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { AdditionalCost, AdditionalCostDocument } from 'src/schemas/additional-cost.schema';
import { ErrorService } from './error.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class AdditionalCostService {
    public constructor(
        @InjectModel(AdditionalCost.name)
        private additionalCostModel: Model<AdditionalCostDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async update(additionalCost: UpdateAdditionalCostDto): Promise<SuccessDto> {
        try {
            const updatedCost = await this.additionalCostModel
                .findByIdAndUpdate(additionalCost._id, additionalCost)
                .exec();
            if (!updatedCost) {
                throw new NotFoundException('Additional cost not found');
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update additional cost');
            return { success: false };
        }
    }

    public async add(additionalCost: CreateAdditionalCostDto): Promise<SuccessDto> {
        try {
            const newCost = new this.additionalCostModel(additionalCost);
            await newCost.save();
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add additional cost');
            return { success: false };
        }
    }

    public async getByProductId(productId: ObjectId): Promise<AdditionalCostDocument> {
        try {
            const additionalCost = await this.additionalCostModel.findOne({ productId }).exec();
            if (!additionalCost) {
                throw new NotFoundException('Additional cost not found');
            }
            return additionalCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get additional cost by product id');
            return {} as AdditionalCostDocument;
        }
    }
}
