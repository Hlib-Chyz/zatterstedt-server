'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VariantsService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const mongodb_1 = require('mongodb');
const variant_entity_1 = require('../entities/variant.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
let VariantsService = class VariantsService {
    constructor(variantsRepository, errorService) {
        this.variantsRepository = variantsRepository;
        this.errorService = errorService;
    }
    async getByProductId(productId) {
        try {
            return await this.variantsRepository.find({
                where: { productId },
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variants by product id');
            return [];
        }
    }
    async getVariant(_id) {
        try {
            const variant = await this.variantsRepository.findOne({
                where: { _id },
            });
            if (!variant) {
                throw new common_1.NotFoundException('Variant not found');
            }
            return variant;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variant');
            return {};
        }
    }
    async getAll() {
        try {
            return await this.variantsRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all variants');
            return [];
        }
    }
    async deleteVariantsByProductId(productId) {
        try {
            const variants = await this.getByProductId(productId);
            await this.variantsRepository.remove(variants);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to remove variants');
            return { success: false };
        }
    }
    async getProductId(variantId) {
        try {
            const variant = await this.variantsRepository.findOne({
                where: { _id: new mongodb_1.ObjectId(variantId) },
            });
            return variant?.productId ?? '';
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product id');
            return '';
        }
    }
    async add(variant) {
        try {
            const { _id } = await this.variantsRepository.save(variant);
            return _id;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new variant');
            return '';
        }
    }
};
exports.VariantsService = VariantsService;
exports.VariantsService = VariantsService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, typeorm_1.InjectRepository)(variant_entity_1.Variant)),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            error_service_1.ErrorService,
        ]),
    ],
    VariantsService
);
//# sourceMappingURL=variants.service.js.map
