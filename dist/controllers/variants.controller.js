"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantsController = void 0;
const tslib_1 = require("tslib");
const variant_dto_1 = require("../dto/variant.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const variants_service_1 = require("../services/variants.service");
let VariantsController = class VariantsController {
    constructor(variantsService) {
        this.variantsService = variantsService;
    }
    async getVariants() {
        return this.variantsService.getVariants();
    }
    async setVariants(createVariantsDto) {
        return this.variantsService.setVariants(createVariantsDto);
    }
    async canSaveVariants(body) {
        return this.variantsService.canSaveVariants(body);
    }
};
exports.VariantsController = VariantsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], VariantsController.prototype, "getVariants", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [variant_dto_1.CreateVariantsDto]),
    tslib_1.__metadata("design:returntype", Promise)
], VariantsController.prototype, "setVariants", null);
tslib_1.__decorate([
    (0, common_1.Post)('can-save-variants'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [variant_dto_1.CanSaveVariantsDto]),
    tslib_1.__metadata("design:returntype", Promise)
], VariantsController.prototype, "canSaveVariants", null);
exports.VariantsController = VariantsController = tslib_1.__decorate([
    (0, common_1.Controller)('variants'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [variants_service_1.VariantsService])
], VariantsController);
//# sourceMappingURL=variants.controller.js.map