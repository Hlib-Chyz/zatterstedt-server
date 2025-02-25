import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    InventoryDto,
    ManufacturingCostInventoryDto,
} from '@dto/manufacturing-cost.dto';
import { SuccessDto } from '@dto/shared.dto';
import { Injectable } from '@nestjs/common';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { OrderService } from '@services/order.service';
import { plainToInstance } from 'class-transformer';
import { Types } from 'mongoose';

@Injectable()
export class ManufacturingCostFacade {
    public constructor(
        private readonly errorService: ErrorService,
        private readonly inventoryService: InventoryService,
        private readonly orderService: OrderService,
        private readonly manufacturingCostService: ManufacturingCostService
    ) {}

    public async updateInventory(
        id: Types.ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto> {
        try {
            const manufacturingCost = await this.manufacturingCostService.getById(id);
            if (manufacturingCostInventory.oldInventory.length) {
                await this.changeInventoryAmount(manufacturingCostInventory.oldInventory, true);
            }
            await this.changeInventoryAmount(manufacturingCostInventory.inventory, false);
            await this.manufacturingCostService.updateInventory(
                manufacturingCostInventory.inventory,
                manufacturingCost
            );
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update inventory');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async canSaveInventory({
        variantIds,
    }: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto> {
        try {
            let canSaveInventory = true;
            for (const id of variantIds) {
                const orders = await this.orderService.getByVariantId(id);
                if (orders.length) {
                    canSaveInventory = false;
                    break;
                }
            }
            return plainToInstance(
                CanSaveInventoryResponseDto,
                { canSaveInventory },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get can save inventory property');
            return plainToInstance(
                CanSaveInventoryResponseDto,
                { canSaveInventory: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    private async changeInventoryAmount(
        inventory: InventoryDto[],
        negative: boolean
    ): Promise<void> {
        for (const inv of inventory) {
            if (inv.duringManufacture) {
                await this.inventoryService.updateUsedAndPaid(
                    inv.inventoryId,
                    negative ? -inv.quantityInUse : inv.quantityInUse,
                    negative ? -inv.quantityInCost : inv.quantityInCost
                );
            }
        }
    }
}
