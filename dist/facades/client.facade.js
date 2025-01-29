'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClientFacade = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const clients_service_1 = require('../services/clients.service');
const error_service_1 = require('../services/error.service');
const orders_service_1 = require('../services/orders.service');
const variant_facade_1 = require('./variant.facade');
let ClientFacade = class ClientFacade {
    constructor(variantFacade, errorService, clientsService, ordersService) {
        this.variantFacade = variantFacade;
        this.errorService = errorService;
        this.clientsService = clientsService;
        this.ordersService = ordersService;
    }
    async getAll() {
        try {
            const res = [];
            const clients = await this.clientsService.getAll();
            for (const client of clients) {
                const orders = await this.ordersService.getOrdersByClientId(client._id.toString());
                const purchases = [];
                for (const order of orders) {
                    for (const variant of order.variants) {
                        const newPurchase = `${await this.variantFacade.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`;
                        purchases.push(newPurchase);
                    }
                }
                res.push({ ...client, purchases });
            }
            return res;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all clients');
            return [];
        }
    }
};
exports.ClientFacade = ClientFacade;
exports.ClientFacade = ClientFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__metadata('design:paramtypes', [
            variant_facade_1.VariantFacade,
            error_service_1.ErrorService,
            clients_service_1.ClientsService,
            orders_service_1.OrdersService,
        ]),
    ],
    ClientFacade
);
//# sourceMappingURL=client.facade.js.map
