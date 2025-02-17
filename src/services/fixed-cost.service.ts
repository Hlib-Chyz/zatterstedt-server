import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateFixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { FixedCost } from 'src/schemas/fixed-cost.schema';
import { ErrorService } from './error.service';

@Injectable()
export class FixedCostService {
    public constructor(
        @InjectModel(FixedCost.name) private fixedCostModel: Model<FixedCost>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<FixedCost[]> {
        try {
            return await this.fixedCostModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all fixed costs');
            return [];
        }
    }

    public async add(fixedCost: CreateFixedCostDto): Promise<SuccessDto> {
        try {
            const createdFixedCost = new this.fixedCostModel(fixedCost);
            await createdFixedCost.save();
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add fixed cost');
            return { success: false };
        }
    }

    public async update(fixedCost: UpdateFixedCostDto): Promise<SuccessDto> {
        try {
            const result = await this.fixedCostModel
                .findByIdAndUpdate(fixedCost._id, fixedCost)
                .exec();
            if (!result) {
                throw new NotFoundException('Fixed cost not found');
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update fixed cost');
            return { success: false };
        }
    }

    public async delete(id: ObjectId): Promise<DeleteGetDto> {
        try {
            const result = await this.fixedCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Fixed cost not found');
            }
            return { id };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete fixed cost');
            return { id };
        }
    }
}
