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
import { ManufacturingCostsService } from '@services/manufacturing-costs.service';
import { OrdersService } from '@services/orders.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class ManufacturingCostFacade {
    public constructor(
        private readonly errorService: ErrorService,
        private readonly inventoryService: InventoryService,
        private readonly ordersService: OrdersService,
        private readonly manufacturingCostsService: ManufacturingCostsService
    ) {}

    public async addInventory(
        _id: ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<SuccessDto> {
        try {
            const manufacturingCost = await this.manufacturingCostsService.getManufacturingCost({
                _id,
            });
            if (manufacturingCostInventory.oldInventory.length) {
                await this.changeInventoryAmount(manufacturingCostInventory.oldInventory, true);
            }
            await this.changeInventoryAmount(manufacturingCostInventory.inventory, false);
            await this.manufacturingCostsService.add(
                manufacturingCostInventory.inventory,
                manufacturingCost
            );
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
}
