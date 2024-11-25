import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import {
    CreateManufacturingCostDto,
    ManufacturingCostInventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCost } from 'src/entities/manufacturing-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { InventoryService } from './inventory.service';

@Injectable()
export class ManufacturingCostsService {
    public constructor(
        @InjectRepository(ManufacturingCost)
        private manufacturingCostsRepository: Repository<ManufacturingCost>,
        private readonly errorService: ErrorService,
        private readonly inventoryService: InventoryService
    ) {}

    public async getByProductId(productId: ObjectId | string): Promise<ManufacturingCost> {
        try {
            const manufacturingCost = await this.manufacturingCostsRepository.findOne({
                where: { productId: productId.toString() },
            });
            if (!manufacturingCost) {
                throw new NotFoundException('Manufacturing cost not found');
            }
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by product id');
            return {} as ManufacturingCost;
        }
    }

    public async create(manufacturingCost: CreateManufacturingCostDto): Promise<SuccessDto> {
        try {
            await this.manufacturingCostsRepository.save(manufacturingCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create manufacturing cost');
            return { success: false };
        }
    }

    public async update(_id: ObjectId, job: ManufacturingCostJobDto['jobs']): Promise<SuccessDto> {
        try {
            const foundManufacturingCost = await this.manufacturingCostsRepository.findOne({
                where: { _id },
            });
            if (!foundManufacturingCost) {
                throw new NotFoundException('Manufacturing cost not found');
            }
            await this.manufacturingCostsRepository.save({ _id, job });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update manufacturing cost');
            return { success: false };
        }
    }

    public async addInventory(
        _id: ObjectId,
        inventory: ManufacturingCostInventoryDto['inventory']
    ): Promise<SuccessDto> {
        try {
            const foundManufacturingCost = await this.manufacturingCostsRepository.findOne({
                where: { _id },
            });
            if (!foundManufacturingCost) {
                throw new NotFoundException('Manufacturing cost not found');
            }
            for (const inv of inventory) {
                if (inv.duringManufacture) {
                    await this.inventoryService.changeInventoryAmount(
                        inv.inventoryId,
                        inv.quantityInUse
                    );
                }
            }
            this.manufacturingCostsRepository.save({ _id, inventory });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add inventory');
            return { success: false };
        }
    }
}
