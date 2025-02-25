import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { FixedCost, FixedCostDocument } from 'src/schemas/fixed-cost.schema';
import { ErrorService } from './error.service';

@Injectable()
export class FixedCostService {
    public constructor(
        @InjectModel(FixedCost.name) private fixedCostModel: Model<FixedCostDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<FixedCostDto[]> {
        try {
            const fixedCosts = await this.fixedCostModel.find().exec();
            return plainToInstance(FixedCostDto, fixedCosts, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all fixed costs');
            return [];
        }
    }

    public async add(fixedCost: CreateFixedCostDto): Promise<void> {
        try {
            const createdFixedCost = new this.fixedCostModel(fixedCost);
            await createdFixedCost.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add fixed cost');
        }
    }

    public async update(fixedCost: UpdateFixedCostDto): Promise<void> {
        try {
            const result = await this.fixedCostModel
                .findByIdAndUpdate(fixedCost._id, fixedCost)
                .exec();
            if (!result) {
                throw new NotFoundException('Fixed cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update fixed cost');
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            const result = await this.fixedCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Fixed cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete fixed cost');
        }
    }
}
