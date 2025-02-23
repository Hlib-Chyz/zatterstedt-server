'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderService = void 0;
const tslib_1 = require('tslib');
const shared_dto_1 = require('../dto/shared.dto');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const class_transformer_1 = require('class-transformer');
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
            const orderNumber = (ordersLength + 2).toString().padStart(5, '0');
            const newOrder = new this.orderModel({
                clientId: clientId || order.clientId,
                date: order.date,
                variants: order.variants,
                orderNumber,
            });
            await newOrder.save();
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
