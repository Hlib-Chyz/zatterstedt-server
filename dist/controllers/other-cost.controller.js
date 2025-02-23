'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OtherCostController = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const other_cost_service_1 = require('../services/other-cost.service');
const mongoose_1 = require('mongoose');
const other_cost_dto_1 = require('../dto/other-cost.dto');
const shared_dto_1 = require('../dto/shared.dto');
const error_filter_1 = require('../filters/error.filter');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
let OtherCostController = class OtherCostController {
    constructor(otherCostService) {
        this.otherCostService = otherCostService;
    }
    async getAll() {
        return this.otherCostService.getAll();
    }
    async add(otherCost) {
        return this.otherCostService.add(otherCost);
    }
    async update(otherCost) {
        return this.otherCostService.update(otherCost);
    }
    async delete(id) {
        return this.otherCostService.delete(id);
    }
};
exports.OtherCostController = OtherCostController;
tslib_1.__decorate(
    [
        (0, common_1.Get)(),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', []),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    OtherCostController.prototype,
    'getAll',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Post)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [other_cost_dto_1.CreateOtherCostDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    OtherCostController.prototype,
    'add',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Put)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [other_cost_dto_1.UpdateOtherCostDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    OtherCostController.prototype,
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
    OtherCostController.prototype,
    'delete',
    null
);
exports.OtherCostController = OtherCostController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('other-cost'),
        (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [other_cost_service_1.OtherCostService]),
    ],
    OtherCostController
);
//# sourceMappingURL=other-cost.controller.js.map
