"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const tslib_1 = require("tslib");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const order_dto_1 = require("../dto/order.dto");
const order_facade_1 = require("../facades/order.facade");
let OrderController = class OrderController {
    constructor(orderFacade) {
        this.orderFacade = orderFacade;
    }
    async getAll() {
        return this.orderFacade.getAll();
    }
    async create(order) {
        return this.orderFacade.add(order);
    }
};
exports.OrderController = OrderController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [order_dto_1.CreateOrderDto]),
    tslib_1.__metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
exports.OrderController = OrderController = tslib_1.__decorate([
    (0, common_1.Controller)('order'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [order_facade_1.OrderFacade])
], OrderController);
//# sourceMappingURL=order.controller.js.map