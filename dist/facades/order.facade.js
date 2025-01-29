'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderFacade = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const clients_service_1 = require('../services/clients.service');
const error_service_1 = require('../services/error.service');
const inventory_service_1 = require('../services/inventory.service');
const manufacturing_costs_service_1 = require('../services/manufacturing-costs.service');
const orders_service_1 = require('../services/orders.service');
const stock_service_1 = require('../services/stock.service');
const variants_service_1 = require('../services/variants.service');
const variant_facade_1 = require('./variant.facade');
let OrderFacade = class OrderFacade {
    constructor(
        errorService,
        stockService,
        inventoryService,
        clientsService,
        variantsService,
        variantFacade,
        ordersService,
        manufacturingCostsService
    ) {
        this.errorService = errorService;
        this.stockService = stockService;
        this.inventoryService = inventoryService;
        this.clientsService = clientsService;
        this.variantsService = variantsService;
        this.variantFacade = variantFacade;
        this.ordersService = ordersService;
        this.manufacturingCostsService = manufacturingCostsService;
    }
    async getAll() {
        try {
            const orders = await this.ordersService.getAll();
            const res = [];
            for (const order of orders) {
                const client = await this.clientsService.getByClientId(order.clientId);
                const resVariant = [];
                for (const variant of order.variants) {
                    resVariant.push(
                        `${await this.variantFacade.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`
                    );
                }
                res.push({
                    _id: order._id,
                    date: order.date,
                    client: `${client.name} - ${client.contacts}`,
                    variants: resVariant,
                    orderNumber: order.orderNumber,
                });
            }
            return res;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders');
            return [];
        }
    }
    async add(order) {
        try {
            let clientId = '';
            if (!order.clientId) {
                clientId = (
                    await this.clientsService.add({
                        name: order.clientName,
                        contacts: order.contacts,
                    })
                ).toString();
            }
            for (const variant of order.variants) {
                if (variant.price === 0) {
                    await this.stockService.decreaseRealizedParty(variant._id, variant.quantity);
                }
                const productId = await this.variantsService.getProductId(variant._id);
                const manufacturingCost =
                    await this.manufacturingCostsService.getByProductId(productId);
                for (const inventory of manufacturingCost?.inventory ?? []) {
                    if (!inventory.duringManufacture) {
                        await this.inventoryService.changeInventoryAmount(
                            inventory.inventoryId,
                            variant.quantity * inventory.quantityInUse,
                            variant.quantity * inventory.quantityInCost
                        );
                    }
                }
                await this.stockService.increaseSold(variant._id, variant.quantity);
            }
            const orders = await this.ordersService.getAll();
            await this.ordersService.add(clientId, order, orders.length);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add order');
            return { success: false };
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
            clients_service_1.ClientsService,
            variants_service_1.VariantsService,
            variant_facade_1.VariantFacade,
            orders_service_1.OrdersService,
            manufacturing_costs_service_1.ManufacturingCostsService,
        ]),
    ],
    OrderFacade
);
//# sourceMappingURL=order.facade.js.map
