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
import { ObjectId } from 'mongodb';

@Injectable()
export class ManufacturingCostFacade {
    public constructor(
        private readonly errorService: ErrorService,
        private readonly inventoryService: InventoryService,
        private readonly orderService: OrderService,
        private readonly manufacturingCostService: ManufacturingCostService
    ) {}

    public async updateInventory(
        id: ObjectId,
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
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add inventory');
            return new SuccessDto({ success: false });
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
            return { canSaveInventory };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get can save inventory property');
            return { canSaveInventory: false };
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
