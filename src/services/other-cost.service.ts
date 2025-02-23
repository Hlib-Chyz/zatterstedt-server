import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
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

    public async add(otherCost: CreateOtherCostDto): Promise<SuccessDto> {
        try {
            const newOtherCost = new this.otherCostModel(otherCost);
            await newOtherCost.save();
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create other costs');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
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
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update other cost');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async delete(id: Types.ObjectId): Promise<DeleteGetDto> {
        try {
            const result = await this.otherCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Other cost not found');
            }
            return plainToInstance(DeleteGetDto, { id }, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete other cost');
            return plainToInstance(DeleteGetDto, { id }, { excludeExtraneousValues: true });
        }
    }
}
