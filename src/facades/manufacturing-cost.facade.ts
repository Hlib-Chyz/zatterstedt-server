import {
    CanSaveInventoryDto,
    CanSaveInventoryResponseDto,
    InventoryDto,
    ManufacturingCostInventoryDto,
} from '@dto/manufacturing-cost.dto';
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

    // TODO TRANSACTION
    public async updateInventory(
        id: Types.ObjectId,
        manufacturingCostInventory: ManufacturingCostInventoryDto
    ): Promise<void> {
        try {
            const manufacturingCost = await this.manufacturingCostService.getById(id);

            await Promise.all([
                manufacturingCostInventory.oldInventory.length
                    ? this.changeInventoryAmount(manufacturingCostInventory.oldInventory, true)
                    : Promise.resolve(),
                this.changeInventoryAmount(manufacturingCostInventory.inventory, false),
            ]);

            await this.manufacturingCostService.updateInventory(
                manufacturingCostInventory.inventory,
                manufacturingCost
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update inventory');
        }
    }

    public async canSaveInventory({
        variantIds,
    }: CanSaveInventoryDto): Promise<CanSaveInventoryResponseDto> {
        try {
            const results = await Promise.all(
                variantIds.map((id) => this.orderService.getByVariantId(id))
            );
            return plainToInstance(
                CanSaveInventoryResponseDto,
                { canSaveInventory: !results.some((orders) => orders.length > 0) },
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
        await Promise.all(
            inventory
                .filter((inv) => inv.duringManufacture)
                .map((inv) =>
                    this.inventoryService.updateUsedAndPaid(
                        inv.inventoryId,
                        negative ? -inv.quantityInUse : inv.quantityInUse,
                        negative ? -inv.quantityInCost : inv.quantityInCost
                    )
                )
        );
    }
}
