import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { OtherCost } from 'src/entities/other-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { DeleteGetDto, SuccessDto } from 'src/dto/shared.dto';
import { CreateOtherCostDto, OtherCostDto, UpdateOtherCostDto } from 'src/dto/other-cost.dto';

@Injectable()
export class OtherCostsService {
    public constructor(
        @InjectRepository(OtherCost) private otherCostsRepository: Repository<OtherCost>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<OtherCostDto[]> {
        try {
            return await this.otherCostsRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all other costs');
            return [];
        }
    }

    public async create(otherCost: CreateOtherCostDto): Promise<SuccessDto> {
        try {
            await this.otherCostsRepository.save(otherCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create other costs');
            return { success: false };
        }
    }

    public async update(otherCost: UpdateOtherCostDto): Promise<SuccessDto> {
        try {
            await this.getOtherCost(otherCost._id);
            await this.otherCostsRepository.save(otherCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update other cost');
            return { success: false };
        }
    }

    public async delete(_id: ObjectId): Promise<DeleteGetDto> {
        try {
            const otherCost = await this.getOtherCost(_id);
            await this.otherCostsRepository.remove(otherCost);
            return { _id };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete other cost');
            return { _id };
        }
    }

    private async getOtherCost(_id: ObjectId): Promise<OtherCost> {
        const otherCost = await this.otherCostsRepository.findOne({
            where: { _id },
        });
        if (!otherCost) {
            throw new NotFoundException('Other cost not found');
        }
        return otherCost;
    }
}
