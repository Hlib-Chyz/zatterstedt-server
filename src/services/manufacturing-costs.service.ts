import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryService } from '@services/inventory.service';
import { OrdersService } from '@services/orders.service';
import { ObjectId } from 'mongodb';
import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    CreateManufacturingCostDto,
    InventoryDto,
    ManufacturingCostInventoryDto,
    ManufacturingCostJobDto,
} from 'src/dto/manufacturing-cost.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ManufacturingCost } from 'src/entities/manufacturing-cost.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';

@Injectable()
export class ManufacturingCostsService {
    public constructor(
        @InjectRepository(ManufacturingCost)
        private manufacturingCostsRepository: Repository<ManufacturingCost>,
        private readonly errorService: ErrorService,
        private readonly inventoryService: InventoryService,
        private readonly ordersService: OrdersService
    ) {}

    public async getByProductId(productId: ObjectId | string): Promise<ManufacturingCost> {
        try {
            const manufacturingCost = await this.getManufacturingCost({
                productId: productId.toString(),
            });
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by product id');
            return {} as ManufacturingCost;
        }
    }

    public async create(manufacturingCost: CreateManufacturingCostDto): Promise<SuccessDto> {
        try {
            await this.manufacturingCostsRepository.save({
                ...manufacturingCost,
                job: [],
                inventory: [],
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create manufacturing cost');
            return { success: false };
        }
    }

    public async update(_id: ObjectId, job: ManufacturingCostJobDto['job']): Promise<SuccessDto> {
        try {
            const manufacturingCost = await this.getManufacturingCost({ _id });
            await this.manufacturingCostsRepository.save({ ...manufacturingCost, job });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update manufacturing cost');
            return { success: false };
        }
    }

    public async addInventory(
        _id: ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto> {
        try {
            const manufacturingCost = await this.getManufacturingCost({ _id });
            if (manufacturingCostInventory.oldInventory.length) {
                await this.changeInventoryAmount(manufacturingCostInventory.oldInventory, true);
            }
            await this.changeInventoryAmount(manufacturingCostInventory.inventory, false);
            await this.manufacturingCostsRepository.save({
                ...manufacturingCost,
                inventory: manufacturingCostInventory.inventory,
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add inventory');
            return { success: false };
        }
    }

    public async canSaveInventory({
        variantIds,
    }: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto> {
        try {
            let canSaveInventory = true;
            for (const id of variantIds) {
                const orders = await this.ordersService.getByVariantId(id);
                if (orders.length) {
                    canSaveInventory = false;
                    break;
                }
            }
            return { canSaveInventory };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add inventory');
            return { canSaveInventory: false };
        }
    }

    private async changeInventoryAmount(
        inventory: InventoryDto[],
        negative: boolean
    ): Promise<void> {
        for (const inv of inventory) {
            if (inv.duringManufacture) {
                await this.inventoryService.changeInventoryAmount(
                    inv.inventoryId,
                    negative ? -inv.quantityInUse : inv.quantityInUse,
                    negative ? -inv.quantityInCost : inv.quantityInCost
                );
            }
        }
    }

    private async getManufacturingCost(
        where: Partial<ManufacturingCost>
    ): Promise<ManufacturingCost> {
        const manufacturingCost = await this.manufacturingCostsRepository.findOne({
            where,
        });
        if (!manufacturingCost) {
            throw new NotFoundException('Manufacturing cost not found');
        }
        return manufacturingCost;
    }
}
