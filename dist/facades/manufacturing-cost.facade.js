'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManufacturingCostFacade = void 0;
const tslib_1 = require('tslib');
const manufacturing_cost_dto_1 = require('../dto/manufacturing-cost.dto');
const common_1 = require('@nestjs/common');
const error_service_1 = require('../services/error.service');
const inventory_service_1 = require('../services/inventory.service');
const manufacturing_cost_service_1 = require('../services/manufacturing-cost.service');
const order_service_1 = require('../services/order.service');
const class_transformer_1 = require('class-transformer');
let ManufacturingCostFacade = class ManufacturingCostFacade {
    constructor(errorService, inventoryService, orderService, manufacturingCostService) {
        this.errorService = errorService;
        this.inventoryService = inventoryService;
        this.orderService = orderService;
        this.manufacturingCostService = manufacturingCostService;
    }
    async updateInventory(id, manufacturingCostInventory) {
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
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update inventory');
        }
    }
    async canSaveInventory({ variantIds }) {
        try {
            let canSaveInventory = true;
            for (const id of variantIds) {
                const orders = await this.orderService.getByVariantId(id);
                if (orders.length) {
                    canSaveInventory = false;
                    break;
                }
            }
            return (0, class_transformer_1.plainToInstance)(
                manufacturing_cost_dto_1.CanSaveInventoryResponseDto,
                { canSaveInventory },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get can save inventory property');
            return (0, class_transformer_1.plainToInstance)(
                manufacturing_cost_dto_1.CanSaveInventoryResponseDto,
                { canSaveInventory: false },
                { excludeExtraneousValues: true }
            );
        }
    }
    async changeInventoryAmount(inventory, negative) {
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
};
exports.ManufacturingCostFacade = ManufacturingCostFacade;
exports.ManufacturingCostFacade = ManufacturingCostFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__metadata('design:paramtypes', [
            error_service_1.ErrorService,
            inventory_service_1.InventoryService,
            order_service_1.OrderService,
            manufacturing_cost_service_1.ManufacturingCostService,
        ]),
    ],
    ManufacturingCostFacade
);
//# sourceMappingURL=manufacturing-cost.facade.js.map
