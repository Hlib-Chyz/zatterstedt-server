'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DevelopmentCostController = void 0;
const tslib_1 = require('tslib');
const shared_dto_1 = require('../dto/shared.dto');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const common_1 = require('@nestjs/common');
const development_cost_service_1 = require('../services/development-cost.service');
const mongoose_1 = require('mongoose');
const development_cost_dto_1 = require('../dto/development-cost.dto');
const error_filter_1 = require('../filters/error.filter');
let DevelopmentCostController = class DevelopmentCostController {
    constructor(developmentCostService) {
        this.developmentCostService = developmentCostService;
    }
    async add(developmentCost, res) {
        await this.developmentCostService.add(developmentCost);
        res.status(204).send();
    }
    async update(developmentCost, res) {
        await this.developmentCostService.update(developmentCost);
        res.status(204).send();
    }
    async delete(id, res) {
        await this.developmentCostService.delete(id);
        res.status(204).send();
    }
};
exports.DevelopmentCostController = DevelopmentCostController;
tslib_1.__decorate(
    [
        (0, common_1.Post)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__param(1, (0, common_1.Res)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [
            development_cost_dto_1.CreateDevelopmentCostDto,
            Object,
        ]),
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
        tslib_1.__param(1, (0, common_1.Res)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [
            development_cost_dto_1.UpdateDevelopmentCostDto,
            Object,
        ]),
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
        tslib_1.__param(1, (0, common_1.Res)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [mongoose_1.Types.ObjectId, Object]),
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
