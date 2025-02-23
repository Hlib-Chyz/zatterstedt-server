import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { CreateDevelopmentCostDto, UpdateDevelopmentCostDto } from 'src/dto/development-cost.dto';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
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

    public async add(developmentCost: CreateDevelopmentCostDto): Promise<SuccessDto> {
        try {
            const createdDevelopmentCost = new this.developmentCostModel(developmentCost);
            await createdDevelopmentCost.save();
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add development cost');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
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
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update development cost');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async delete(id: Types.ObjectId): Promise<DeleteGetDto> {
        try {
            const result = await this.developmentCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException('Development cost not found');
            }
            return plainToInstance(DeleteGetDto, { id }, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete development cost');
            return plainToInstance(DeleteGetDto, { id }, { excludeExtraneousValues: true });
        }
    }
}
