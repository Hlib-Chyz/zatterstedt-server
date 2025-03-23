'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderFacade = void 0;
const tslib_1 = require('tslib');
const order_dto_1 = require('../dto/order.dto');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const client_service_1 = require('../services/client.service');
const error_service_1 = require('../services/error.service');
const inventory_service_1 = require('../services/inventory.service');
const manufacturing_cost_service_1 = require('../services/manufacturing-cost.service');
const order_service_1 = require('../services/order.service');
const stock_service_1 = require('../services/stock.service');
const variant_service_1 = require('../services/variant.service');
const class_transformer_1 = require('class-transformer');
const mongoose_2 = require('mongoose');
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
        manufacturingCostService,
        connection
    ) {
        this.errorService = errorService;
        this.stockService = stockService;
        this.inventoryService = inventoryService;
        this.clientService = clientService;
        this.variantService = variantService;
        this.variantFacade = variantFacade;
        this.orderService = orderService;
        this.manufacturingCostService = manufacturingCostService;
        this.connection = connection;
    }
    async getAll() {
        try {
            const orders = await this.orderService.getAll();
            const res = await Promise.all(
                orders.map(async (order) => {
                    const [client, variantInfo] = await Promise.all([
                        this.clientService.getById(order.clientId),
                        Promise.all(
                            order.variants.map((variant) =>
                                this.variantFacade.getVariantInfo(
                                    variant._id,
                                    `${variant.quantity}/${variant.price}`
                                )
                            )
                        ),
                    ]);
                    return {
                        _id: order._id,
                        date: order.date,
                        client: `${client.name} - ${client.contact}`,
                        variants: variantInfo,
                        orderNumber: order.orderNumber,
                    };
                })
            );
            return (0, class_transformer_1.plainToInstance)(order_dto_1.OrderDto, res, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders');
            return [];
        }
    }
    async add(order) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            let clientId = order.clientId ?? null;
            if (!clientId) {
                clientId = await this.clientService.add(order.clientName, order.contact, session);
            }
            for (const variant of order.variants) {
                const productId = await this.variantService.getProductId(variant._id);
                if (variant.price === 0) {
                    await this.stockService.decreaseRealizedParty(
                        variant._id,
                        variant.quantity,
                        session
                    );
                }
                const manufacturingCost =
                    await this.manufacturingCostService.getByProductId(productId);
                for (const inventory of manufacturingCost?.inventory ?? []) {
                    if (!inventory.duringManufacture) {
                        await this.inventoryService.updateUsedAndPaid(
                            inventory.inventoryId,
                            variant.quantity * inventory.quantityInUse,
                            variant.quantity * inventory.quantityInCost,
                            session
                        );
                    }
                }
                await this.stockService.increaseSold(variant._id, variant.quantity, session);
            }
            const ordersCount = (await this.orderService.getAll()).length;
            await this.orderService.add(clientId, order, ordersCount);
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.errorService.throwError(error, 'Failed to add order');
        } finally {
            session.endSession();
        }
    }
};
exports.OrderFacade = OrderFacade;
exports.OrderFacade = OrderFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(8, (0, mongoose_1.InjectConnection)()),
        tslib_1.__metadata('design:paramtypes', [
            error_service_1.ErrorService,
            stock_service_1.StockService,
            inventory_service_1.InventoryService,
            client_service_1.ClientService,
            variant_service_1.VariantService,
            variant_facade_1.VariantFacade,
            order_service_1.OrderService,
            manufacturing_cost_service_1.ManufacturingCostService,
            mongoose_2.Connection,
        ]),
    ],
    OrderFacade
);
//# sourceMappingURL=order.facade.js.map
