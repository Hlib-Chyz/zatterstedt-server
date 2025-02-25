'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VariantService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const variant_schema_1 = require('../schemas/variant.schema');
const error_service_1 = require('./error.service');
let VariantService = class VariantService {
    constructor(variantModel, errorService) {
        this.variantModel = variantModel;
        this.errorService = errorService;
    }
    async getAllByProductId(productId) {
        try {
            return await this.variantModel.find({ productId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variants by product id');
            return [];
        }
    }
    async getById(id) {
        try {
            const variant = await this.variantModel.findById(id).exec();
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
            return await this.variantModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all variants');
            return [];
        }
    }
    async deleteManyByProductId(productId) {
        try {
            await this.variantModel.deleteMany({ productId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to remove variants');
        }
    }
    async getProductId(variantId) {
        try {
            const variant = await this.variantModel.findById(variantId).exec();
            if (!variant) {
                throw new common_1.NotFoundException('Variant not found');
            }
            return variant.productId;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product id');
            return {};
        }
    }
    async add(variant) {
        try {
            const newVariant = new this.variantModel(variant);
            const savedVariant = await newVariant.save();
            return savedVariant._id;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new variant');
            return '';
        }
    }
};
exports.VariantService = VariantService;
exports.VariantService = VariantService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, mongoose_1.InjectModel)(variant_schema_1.Variant.name)),
        tslib_1.__metadata('design:paramtypes', [mongoose_2.Model, error_service_1.ErrorService]),
    ],
    VariantService
);
//# sourceMappingURL=variant.service.js.map
