import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { OtherCost, OtherCostDocument } from 'src/schemas/other-cost.schema';
import { ErrorService } from './error.service';

@Injectable()
export class OtherCostService {
    public constructor(
        @InjectModel(OtherCost.name) private otherCostModel: Model<OtherCostDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<OtherCostDto[]> {
        try {
            const res = await this.otherCostModel.find().exec();
            return plainToInstance(OtherCostDto, res, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all other costs');
            return [];
        }
    }

    public async add(otherCost: CreateOtherCostDto): Promise<void> {
        try {
            const newOtherCost = new this.otherCostModel(otherCost);
            await newOtherCost.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create other costs');
        }
    }

    public async update(otherCost: UpdateOtherCostDto): Promise<void> {
        try {
            const result = await this.otherCostModel
                .findOneAndUpdate({ _id: otherCost._id }, otherCost)
                .exec();
            if (!result) {
                throw new NotFoundException('Other cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update other cost');
        }
    }

    public async delete(id: Types.ObjectId): Promise<void> {
        try {
            const result = await this.otherCostModel.findOneAndDelete({ _id: id }).exec();
            if (!result) {
                throw new NotFoundException('Other cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete other cost');
        }
    }
}
