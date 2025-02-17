import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateOtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { OtherCost } from 'src/schemas/other-cost.schema';
import { ErrorService } from './error.service';

@Injectable()
export class OtherCostService {
    public constructor(
        @InjectModel(OtherCost.name) private otherCostModel: Model<OtherCost>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<OtherCost[]> {
        try {
            return await this.otherCostModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all other costs');
            return [];
        }
    }

    public async add(otherCost: CreateOtherCostDto): Promise<SuccessDto> {
        try {
            const newOtherCost = new this.otherCostModel(otherCost);
            await newOtherCost.save();
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create other costs');
            return { success: false };
        }
    }

    public async update(otherCost: UpdateOtherCostDto): Promise<SuccessDto> {
        try {
            const result = await this.otherCostModel
                .findByIdAndUpdate(otherCost._id, otherCost)
                .exec();
            if (!result) {
                throw new NotFoundException('Other cost not found');
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update other cost');
            return { success: false };
        }
    }

    public async delete(id: ObjectId): Promise<DeleteGetDto> {
        try {
            const result = await this.otherCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Other cost not found');
            }
            return { id };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete other cost');
            return { id };
        }
    }
}
