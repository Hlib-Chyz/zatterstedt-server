"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersController = void 0;
const tslib_1 = require("tslib");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const order_dto_1 = require("../dto/order.dto");
const orders_service_1 = require("../services/orders.service");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    async getAll() {
        return this.ordersService.getAll();
    }
    async create(order) {
        return this.ordersService.add(order);
    }
};
exports.OrdersController = OrdersController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrdersController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [order_dto_1.CreateOrderDto]),
    tslib_1.__metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
exports.OrdersController = OrdersController = tslib_1.__decorate([
    (0, common_1.Controller)('orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map