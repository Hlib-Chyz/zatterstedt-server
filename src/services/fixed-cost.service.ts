import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateFixedCostDto, FixedCostDto, UpdateFixedCostDto } from 'src/dto/fixed-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { FixedCost, FixedCostDocument } from 'src/schemas/fixed-cost.schema';
import { ErrorService } from './error.service';
import { plainToInstance } from 'class-transformer';

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

    public async add(fixedCost: CreateFixedCostDto): Promise<SuccessDto> {
        try {
            const createdFixedCost = new this.fixedCostModel(fixedCost);
            await createdFixedCost.save();
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add fixed cost');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
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
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update fixed cost');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async delete(id: ObjectId): Promise<DeleteGetDto> {
        try {
            const result = await this.fixedCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Fixed cost not found');
            }
            return plainToInstance(DeleteGetDto, { id }, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete fixed cost');
            return plainToInstance(DeleteGetDto, { id }, { excludeExtraneousValues: true });
        }
    }
}
