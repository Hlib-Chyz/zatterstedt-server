'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClientFacade = void 0;
const tslib_1 = require('tslib');
const client_dto_1 = require('../dto/client.dto');
const common_1 = require('@nestjs/common');
const client_service_1 = require('../services/client.service');
const error_service_1 = require('../services/error.service');
const order_service_1 = require('../services/order.service');
const class_transformer_1 = require('class-transformer');
const variant_facade_1 = require('./variant.facade');
let ClientFacade = class ClientFacade {
    constructor(variantFacade, errorService, clientService, orderService) {
        this.variantFacade = variantFacade;
        this.errorService = errorService;
        this.clientService = clientService;
        this.orderService = orderService;
    }
    async getAll() {
        try {
            const clients = await this.clientService.getAll();
            const res = await Promise.all(
                clients.map(async (client) => {
                    const orders = await this.orderService.getByClientId(client._id);
                    const purchases = await Promise.all(
                        orders.flatMap((order) =>
                            order.variants.map((variant) =>
                                this.variantFacade.getVariantInfo(
                                    variant._id,
                                    `${variant.quantity}/${variant.price}`
                                )
                            )
                        )
                    );
                    return { ...client, purchases };
                })
            );
            return (0, class_transformer_1.plainToInstance)(client_dto_1.ClientDto, res, {
                excludeExtraneousValues: true,
            });
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
            client_service_1.ClientService,
            order_service_1.OrderService,
        ]),
    ],
    ClientFacade
);
//# sourceMappingURL=client.facade.js.map
