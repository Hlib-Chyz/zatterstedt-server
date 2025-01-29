'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrdersService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const order_entity_1 = require('../entities/order.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
let OrdersService = class OrdersService {
    constructor(ordersRepository, errorService) {
        this.ordersRepository = ordersRepository;
        this.errorService = errorService;
    }
    async getByVariantId(variantId) {
        try {
            const mongoRepository = this.ordersRepository;
            return await mongoRepository.find({
                where: {
                    variants: { $elemMatch: { _id: variantId } },
                },
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders by variant id');
            return [];
        }
    }
    async getOrdersByClientId(clientId) {
        try {
            return await this.ordersRepository.find({
                where: { clientId },
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders by clientId');
            return [];
        }
    }
    async getAll() {
        try {
            return await this.ordersRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all orders');
            return [];
        }
    }
    async add(clientId, order, ordersLength) {
        try {
            await this.ordersRepository.save({
                clientId: clientId || order.clientId,
                date: order.date,
                variants: order.variants,
                orderNumber: (ordersLength + 2).toString().padStart(5, '0'),
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all orders');
            return { success: false };
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            error_service_1.ErrorService,
        ]),
    ],
    OrdersService
);
//# sourceMappingURL=orders.service.js.map
