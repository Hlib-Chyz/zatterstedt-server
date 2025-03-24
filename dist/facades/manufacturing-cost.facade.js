'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManufacturingCostFacade = void 0;
const tslib_1 = require('tslib');
const manufacturing_cost_dto_1 = require('../dto/manufacturing-cost.dto');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const error_service_1 = require('../services/error.service');
const inventory_service_1 = require('../services/inventory.service');
const manufacturing_cost_service_1 = require('../services/manufacturing-cost.service');
const order_service_1 = require('../services/order.service');
const class_transformer_1 = require('class-transformer');
const mongoose_2 = require('mongoose');
let ManufacturingCostFacade = class ManufacturingCostFacade {
    constructor(
        errorService,
        inventoryService,
        orderService,
        manufacturingCostService,
        connection
    ) {
        this.errorService = errorService;
        this.inventoryService = inventoryService;
        this.orderService = orderService;
        this.manufacturingCostService = manufacturingCostService;
        this.connection = connection;
    }
    async updateInventory(id, manufacturingCostInventory) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            await Promise.all([
                manufacturingCostInventory.oldInventory.length
                    ? this.changeInventoryAmount(
                          manufacturingCostInventory.oldInventory,
                          true,
                          session
                      )
                    : Promise.resolve(),
                this.changeInventoryAmount(manufacturingCostInventory.inventory, false, session),
                this.manufacturingCostService.updateInventory(
                    manufacturingCostInventory.inventory,
                    id,
                    session
                ),
            ]);
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.errorService.throwError(error, 'Failed to update inventory');
        } finally {
            session.endSession();
        }
    }
    async canSaveInventory({ variantIds }) {
        try {
            const results = await Promise.all(
                variantIds.map((id) => this.orderService.getByVariantId(id))
            );
            return (0, class_transformer_1.plainToInstance)(
                manufacturing_cost_dto_1.CanSaveInventoryResponseDto,
                { canSaveInventory: !results.some((orders) => orders.length > 0) },
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
    async changeInventoryAmount(inventory, negative, session) {
        await Promise.all(
            inventory
                .filter((inv) => inv.duringManufacture)
                .map((inv) =>
                    this.inventoryService.updateUsedAndPaid(
                        inv.inventoryId,
                        negative ? -inv.quantityInUse : inv.quantityInUse,
                        negative ? -inv.quantityInCost : inv.quantityInCost,
                        session
                    )
                )
        );
    }
};
exports.ManufacturingCostFacade = ManufacturingCostFacade;
exports.ManufacturingCostFacade = ManufacturingCostFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(4, (0, mongoose_1.InjectConnection)()),
        tslib_1.__metadata('design:paramtypes', [
            error_service_1.ErrorService,
            inventory_service_1.InventoryService,
            order_service_1.OrderService,
            manufacturing_cost_service_1.ManufacturingCostService,
            mongoose_2.Connection,
        ]),
    ],
    ManufacturingCostFacade
);
//# sourceMappingURL=manufacturing-cost.facade.js.map
