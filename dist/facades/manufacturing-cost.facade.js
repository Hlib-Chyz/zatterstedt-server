'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManufacturingCostFacade = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const error_service_1 = require('../services/error.service');
const inventory_service_1 = require('../services/inventory.service');
const manufacturing_costs_service_1 = require('../services/manufacturing-costs.service');
const orders_service_1 = require('../services/orders.service');
let ManufacturingCostFacade = class ManufacturingCostFacade {
    constructor(errorService, inventoryService, ordersService, manufacturingCostsService) {
        this.errorService = errorService;
        this.inventoryService = inventoryService;
        this.ordersService = ordersService;
        this.manufacturingCostsService = manufacturingCostsService;
    }
    async addInventory(_id, manufacturingCostInventory) {
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
    async canSaveInventory({ variantIds }) {
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
            this.errorService.throwError(error, 'Failed to get can save inventory property');
            return { canSaveInventory: false };
        }
    }
    async changeInventoryAmount(inventory, negative) {
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
};
exports.ManufacturingCostFacade = ManufacturingCostFacade;
exports.ManufacturingCostFacade = ManufacturingCostFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__metadata('design:paramtypes', [
            error_service_1.ErrorService,
            inventory_service_1.InventoryService,
            orders_service_1.OrdersService,
            manufacturing_costs_service_1.ManufacturingCostsService,
        ]),
    ],
    ManufacturingCostFacade
);
//# sourceMappingURL=manufacturing-cost.facade.js.map
