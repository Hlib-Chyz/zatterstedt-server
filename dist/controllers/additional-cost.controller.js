'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdditionalCostController = void 0;
const tslib_1 = require('tslib');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const common_1 = require('@nestjs/common');
const additional_cost_dto_1 = require('../dto/additional-cost.dto');
const additional_cost_service_1 = require('../services/additional-cost.service');
let AdditionalCostController = class AdditionalCostController {
    constructor(additionalCostService) {
        this.additionalCostService = additionalCostService;
    }
    async update(additionalCost) {
        return this.additionalCostService.update(additionalCost);
    }
};
exports.AdditionalCostController = AdditionalCostController;
tslib_1.__decorate(
    [
        (0, common_1.Put)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [additional_cost_dto_1.UpdateAdditionalCostDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    AdditionalCostController.prototype,
    'update',
    null
);
exports.AdditionalCostController = AdditionalCostController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('additional-cost'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [additional_cost_service_1.AdditionalCostService]),
    ],
    AdditionalCostController
);
//# sourceMappingURL=additional-cost.controller.js.map
