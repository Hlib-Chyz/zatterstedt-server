'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FixedCostsController = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongodb_1 = require('mongodb');
const fixed_cost_dto_1 = require('../dto/fixed-cost.dto');
const shared_dto_1 = require('../dto/shared.dto');
const error_filter_1 = require('../filters/error.filter');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const fixed_costs_service_1 = require('../services/fixed-costs.service');
let FixedCostsController = class FixedCostsController {
    constructor(fixedCostsService) {
        this.fixedCostsService = fixedCostsService;
    }
    async getAll() {
        return this.fixedCostsService.getAll();
    }
    async create(fixedCost) {
        return this.fixedCostsService.create(fixedCost);
    }
    async update(fixedCost) {
        return this.fixedCostsService.update(fixedCost);
    }
    async delete(id) {
        return this.fixedCostsService.delete(id);
    }
};
exports.FixedCostsController = FixedCostsController;
tslib_1.__decorate(
    [
        (0, common_1.Get)(),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', []),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    FixedCostsController.prototype,
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
    FixedCostsController.prototype,
    'create',
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
    FixedCostsController.prototype,
    'update',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Delete)(':id'),
        tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [mongodb_1.ObjectId]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    FixedCostsController.prototype,
    'delete',
    null
);
exports.FixedCostsController = FixedCostsController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('fixed-costs'),
        (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [fixed_costs_service_1.FixedCostsService]),
    ],
    FixedCostsController
);
//# sourceMappingURL=fixed-costs.controller.js.map
