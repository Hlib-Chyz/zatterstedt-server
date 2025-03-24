'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const order_schema_1 = require('../schemas/order.schema');
const error_service_1 = require('./error.service');
let OrderService = class OrderService {
    constructor(orderModel, errorService) {
        this.orderModel = orderModel;
        this.errorService = errorService;
    }
    async getByVariantId(variantId) {
        try {
            return await this.orderModel.find({ 'variants._id': variantId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders by variant id');
            return [];
        }
    }
    async getByClientId(clientId) {
        try {
            return await this.orderModel.find({ clientId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get orders by clientId');
            return [];
        }
    }
    async getAll() {
        try {
            return await this.orderModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all orders');
            return [];
        }
    }
    async add(clientId, order, ordersLength) {
        try {
            const orderNumber = (ordersLength + 1).toString().padStart(5, '0');
            const newOrder = new this.orderModel({
                clientId: clientId || order.clientId,
                date: order.date,
                variants: order.variants,
                orderNumber,
            });
            await newOrder.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add order');
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
        tslib_1.__metadata('design:paramtypes', [mongoose_2.Model, error_service_1.ErrorService]),
    ],
    OrderService
);
//# sourceMappingURL=order.service.js.map
