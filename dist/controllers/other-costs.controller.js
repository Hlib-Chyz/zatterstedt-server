"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherCostsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const other_cost_dto_1 = require("../dto/other-cost.dto");
const shared_dto_1 = require("../dto/shared.dto");
const error_filter_1 = require("../filters/error.filter");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const other_costs_service_1 = require("../services/other-costs.service");
let OtherCostsController = class OtherCostsController {
    constructor(otherCostsService) {
        this.otherCostsService = otherCostsService;
    }
    async getAll() {
        return this.otherCostsService.getAll();
    }
    async create(otherCost) {
        return this.otherCostsService.create(otherCost);
    }
    async update(fixedCost) {
        return this.otherCostsService.update(fixedCost);
    }
    async delete(id) {
        return this.otherCostsService.delete(id);
    }
};
exports.OtherCostsController = OtherCostsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OtherCostsController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [other_cost_dto_1.CreateOtherCostDto]),
    tslib_1.__metadata("design:returntype", Promise)
], OtherCostsController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Put)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [other_cost_dto_1.UpdateOtherCostDto]),
    tslib_1.__metadata("design:returntype", Promise)
], OtherCostsController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [mongodb_1.ObjectId]),
    tslib_1.__metadata("design:returntype", Promise)
], OtherCostsController.prototype, "delete", null);
exports.OtherCostsController = OtherCostsController = tslib_1.__decorate([
    (0, common_1.Controller)('other-costs'),
    (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [other_costs_service_1.OtherCostsService])
], OtherCostsController);
//# sourceMappingURL=other-costs.controller.js.map