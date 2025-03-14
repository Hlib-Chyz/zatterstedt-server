import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { UpdateAdditionalCostDto } from 'src/dto/additional-cost.dto';
import { AdditionalCost, AdditionalCostDocument } from 'src/schemas/additional-cost.schema';
import { ErrorService } from './error.service';

@Injectable()
export class AdditionalCostService {
    public constructor(
        @InjectModel(AdditionalCost.name)
        private additionalCostModel: Model<AdditionalCostDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async update(additionalCost: UpdateAdditionalCostDto): Promise<void> {
        try {
            const updatedCost = await this.additionalCostModel
                .findOneAndUpdate({ _id: additionalCost._id }, additionalCost)
                .exec();
            if (!updatedCost) {
                throw new NotFoundException('Additional cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update additional cost');
        }
    }

    public async add(productId: Types.ObjectId, session: ClientSession): Promise<void> {
        try {
            const newCost = new this.additionalCostModel({ productId });
            newCost.$session(session);
            await newCost.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add additional cost');
        }
    }

    public async getByProductId(productId: Types.ObjectId): Promise<AdditionalCostDocument> {
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
