'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VariantController = void 0;
const tslib_1 = require('tslib');
const variant_dto_1 = require('../dto/variant.dto');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const common_1 = require('@nestjs/common');
const variant_facade_1 = require('../facades/variant.facade');
let VariantController = class VariantController {
    constructor(variantFacade) {
        this.variantFacade = variantFacade;
    }
    async getAll() {
        return this.variantFacade.getAll();
    }
    async updateVariant(createVariantDto, res) {
        await this.variantFacade.updateVariant(createVariantDto);
        res.status(204).send();
    }
    async canSaveVariants(body) {
        return this.variantFacade.canSaveVariants(body);
    }
};
exports.VariantController = VariantController;
tslib_1.__decorate(
    [
        (0, common_1.Get)(),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', []),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    VariantController.prototype,
    'getAll',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Post)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__param(1, (0, common_1.Res)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [variant_dto_1.UpdateVariantDto, Object]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    VariantController.prototype,
    'updateVariant',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Post)('can-save-variants'),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [variant_dto_1.CanSaveVariantDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    VariantController.prototype,
    'canSaveVariants',
    null
);
exports.VariantController = VariantController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('variant'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [variant_facade_1.VariantFacade]),
    ],
    VariantController
);
//# sourceMappingURL=variant.controller.js.map
