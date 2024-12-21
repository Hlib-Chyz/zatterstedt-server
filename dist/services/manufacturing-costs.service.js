'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManufacturingCostsService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const inventory_service_1 = require('./inventory.service');
const orders_service_1 = require('./orders.service');
const manufacturing_cost_entity_1 = require('../entities/manufacturing-cost.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
let ManufacturingCostsService = class ManufacturingCostsService {
    constructor(manufacturingCostsRepository, errorService, inventoryService, ordersService) {
        this.manufacturingCostsRepository = manufacturingCostsRepository;
        this.errorService = errorService;
        this.inventoryService = inventoryService;
        this.ordersService = ordersService;
    }
    async getByProductId(productId) {
        try {
            const manufacturingCost = await this.getManufacturingCost({
                productId: productId.toString(),
            });
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by product id');
            return {};
        }
    }
    async create(manufacturingCost) {
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
    async update(_id, job) {
        try {
            const manufacturingCost = await this.getManufacturingCost({ _id });
            await this.manufacturingCostsRepository.save({ ...manufacturingCost, job });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update manufacturing cost');
            return { success: false };
        }
    }
    async addInventory(_id, manufacturingCostInventory) {
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
            this.errorService.throwError(error, 'Failed to add inventory');
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
    async getManufacturingCost(where) {
        const manufacturingCost = await this.manufacturingCostsRepository.findOne({
            where,
        });
        if (!manufacturingCost) {
            throw new common_1.NotFoundException('Manufacturing cost not found');
        }
        return manufacturingCost;
    }
};
exports.ManufacturingCostsService = ManufacturingCostsService;
exports.ManufacturingCostsService = ManufacturingCostsService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(
            0,
            (0, typeorm_1.InjectRepository)(manufacturing_cost_entity_1.ManufacturingCost)
        ),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            error_service_1.ErrorService,
            inventory_service_1.InventoryService,
            orders_service_1.OrdersService,
        ]),
    ],
    ManufacturingCostsService
);
//# sourceMappingURL=manufacturing-costs.service.js.map
