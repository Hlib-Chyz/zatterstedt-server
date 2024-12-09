"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalCostsController = void 0;
const tslib_1 = require("tslib");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const additional_cost_dto_1 = require("../dto/additional-cost.dto");
const additional_costs_service_1 = require("../services/additional-costs.service");
let AdditionalCostsController = class AdditionalCostsController {
    constructor(additionalCostsService) {
        this.additionalCostsService = additionalCostsService;
    }
    async change(additionalCost) {
        return this.additionalCostsService.update(additionalCost);
    }
};
exports.AdditionalCostsController = AdditionalCostsController;
tslib_1.__decorate([
    (0, common_1.Put)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [additional_cost_dto_1.UpdateAdditionalCostDto]),
    tslib_1.__metadata("design:returntype", Promise)
], AdditionalCostsController.prototype, "change", null);
exports.AdditionalCostsController = AdditionalCostsController = tslib_1.__decorate([
    (0, common_1.Controller)('additional-costs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [additional_costs_service_1.AdditionalCostsService])
], AdditionalCostsController);
//# sourceMappingURL=additional-costs.controller.js.map