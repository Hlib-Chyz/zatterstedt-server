'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FixedCostController = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const fixed_cost_service_1 = require('../services/fixed-cost.service');
const mongoose_1 = require('mongoose');
const fixed_cost_dto_1 = require('../dto/fixed-cost.dto');
const shared_dto_1 = require('../dto/shared.dto');
const error_filter_1 = require('../filters/error.filter');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
let FixedCostController = class FixedCostController {
    constructor(fixedCostService) {
        this.fixedCostService = fixedCostService;
    }
    async getAll() {
        return this.fixedCostService.getAll();
    }
    async add(fixedCost) {
        return this.fixedCostService.add(fixedCost);
    }
    async update(fixedCost) {
        return this.fixedCostService.update(fixedCost);
    }
    async delete(id) {
        return this.fixedCostService.delete(id);
    }
};
exports.FixedCostController = FixedCostController;
tslib_1.__decorate(
    [
        (0, common_1.Get)(),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', []),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    FixedCostController.prototype,
    'getAll',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Post)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [fixed_cost_dto_1.CreateFixedCostDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    FixedCostController.prototype,
    'add',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Put)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [fixed_cost_dto_1.UpdateFixedCostDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    FixedCostController.prototype,
    'update',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Delete)(':id'),
        tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [mongoose_1.Types.ObjectId]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    FixedCostController.prototype,
    'delete',
    null
);
exports.FixedCostController = FixedCostController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('fixed-cost'),
        (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [fixed_cost_service_1.FixedCostService]),
    ],
    FixedCostController
);
//# sourceMappingURL=fixed-cost.controller.js.map
