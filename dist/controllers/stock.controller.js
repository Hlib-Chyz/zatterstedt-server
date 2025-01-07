'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StockController = void 0;
const tslib_1 = require('tslib');
const stock_dto_1 = require('../dto/stock.dto');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const common_1 = require('@nestjs/common');
const stock_service_1 = require('../services/stock.service');
let StockController = class StockController {
    constructor(stockService) {
        this.stockService = stockService;
    }
    async setRealizedParty(body) {
        return this.stockService.setRealizedParty(body);
    }
};
exports.StockController = StockController;
tslib_1.__decorate(
    [
        (0, common_1.Put)('realized-party'),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [stock_dto_1.SetRealizedPartyDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    StockController.prototype,
    'setRealizedParty',
    null
);
exports.StockController = StockController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('stock'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [stock_service_1.StockService]),
    ],
    StockController
);
//# sourceMappingURL=stock.controller.js.map
