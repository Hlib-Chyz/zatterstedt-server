'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DevelopmentCostController = void 0;
const tslib_1 = require('tslib');
const shared_dto_1 = require('../dto/shared.dto');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const common_1 = require('@nestjs/common');
const mongodb_1 = require('mongodb');
const development_cost_dto_1 = require('../dto/development-cost.dto');
const error_filter_1 = require('../filters/error.filter');
const development_cost_service_1 = require('../services/development-cost.service');
let DevelopmentCostController = class DevelopmentCostController {
    constructor(developmentCostService) {
        this.developmentCostService = developmentCostService;
    }
    async add(developmentCost) {
        return this.developmentCostService.add(developmentCost);
    }
    async update(developmentCost) {
        return this.developmentCostService.update(developmentCost);
    }
    async delete(id) {
        return this.developmentCostService.delete(id);
    }
};
exports.DevelopmentCostController = DevelopmentCostController;
tslib_1.__decorate(
    [
        (0, common_1.Post)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [development_cost_dto_1.CreateDevelopmentCostDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    DevelopmentCostController.prototype,
    'add',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Put)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [development_cost_dto_1.UpdateDevelopmentCostDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    DevelopmentCostController.prototype,
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
    DevelopmentCostController.prototype,
    'delete',
    null
);
exports.DevelopmentCostController = DevelopmentCostController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('development-cost'),
        (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [
            development_cost_service_1.DevelopmentCostService,
        ]),
    ],
    DevelopmentCostController
);
//# sourceMappingURL=development-cost.controller.js.map
