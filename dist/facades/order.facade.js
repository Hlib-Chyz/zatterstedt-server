'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderFacade = void 0;
const tslib_1 = require('tslib');
const order_dto_1 = require('../dto/order.dto');
const shared_dto_1 = require('../dto/shared.dto');
const common_1 = require('@nestjs/common');
const client_service_1 = require('../services/client.service');
const error_service_1 = require('../services/error.service');
const inventory_service_1 = require('../services/inventory.service');
const manufacturing_cost_service_1 = require('../services/manufacturing-cost.service');
const order_service_1 = require('../services/order.service');
const stock_service_1 = require('../services/stock.service');
const variant_service_1 = require('../services/variant.service');
const class_transformer_1 = require('class-transformer');
const variant_facade_1 = require('./variant.facade');
let OrderFacade = class OrderFacade {
    constructor(
        errorService,
        stockService,
        inventoryService,
        clientService,
        variantService,
        variantFacade,
        orderService,
        manufacturingCostService
    ) {
        this.errorService = errorService;
        this.stockService = stockService;
        this.inventoryService = inventoryService;
        this.clientService = clientService;
        this.variantService = variantService;
        this.variantFacade = variantFacade;
        this.orderService = orderService;
        this.manufacturingCostService = manufacturingCostService;
    }
    async getAll() {
        try {
            const orders = await this.orderService.getAll();
            const res = [];
            for (const order of orders) {
                const client = await this.clientService.getById(order.clientId);
                const resVariant = [];
                for (const variant of order.variants) {
                    resVariant.push(
                        `${await this.variantFacade.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`
                    );
                }
                res.push({
                    _id: order._id,
                    date: order.date,
                    client: `${client.name} - ${client.contact}`,
                    variants: resVariant,
                    orderNumber: order.orderNumber,
                });
            }
            return (0, class_transformer_1.plainToInstance)(order_dto_1.OrderDto, res, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders');
            return [];
        }
    }
    async add(order) {
        try {
            let clientId = null;
            if (!order.clientId) {
                clientId = await this.clientService.add(order.clientName, order.contact);
            }
            for (const variant of order.variants) {
                if (variant.price === 0) {
                    await this.stockService.decreaseRealizedParty(variant._id, variant.quantity);
                }
                const productId = await this.variantService.getProductId(variant._id);
                const manufacturingCost =
                    await this.manufacturingCostService.getByProductId(productId);
                for (const inventory of manufacturingCost?.inventory ?? []) {
                    if (!inventory.duringManufacture) {
                        await this.inventoryService.updateUsedAndPaid(
                            inventory.inventoryId,
                            variant.quantity * inventory.quantityInUse,
                            variant.quantity * inventory.quantityInCost
                        );
                    }
                }
                await this.stockService.increaseSold(variant._id, variant.quantity);
            }
            const orders = await this.orderService.getAll();
            await this.orderService.add(clientId, order, orders.length);
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add order');
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }
};
exports.OrderFacade = OrderFacade;
exports.OrderFacade = OrderFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__metadata('design:paramtypes', [
            error_service_1.ErrorService,
            stock_service_1.StockService,
            inventory_service_1.InventoryService,
            client_service_1.ClientService,
            variant_service_1.VariantService,
            variant_facade_1.VariantFacade,
            order_service_1.OrderService,
            manufacturing_cost_service_1.ManufacturingCostService,
        ]),
    ],
    OrderFacade
);
//# sourceMappingURL=order.facade.js.map
