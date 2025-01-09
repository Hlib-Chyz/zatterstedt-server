'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VariantsService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const mongodb_1 = require('mongodb');
const product_entity_1 = require('../entities/product.entity');
const variant_entity_1 = require('../entities/variant.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
const stock_service_1 = require('./stock.service');
const order_entity_1 = require('../entities/order.entity');
let VariantsService = class VariantsService {
    constructor(
        variantsRepository,
        productsRepository,
        ordersRepository,
        stockService,
        errorService
    ) {
        this.variantsRepository = variantsRepository;
        this.productsRepository = productsRepository;
        this.ordersRepository = ordersRepository;
        this.stockService = stockService;
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
    async getVariants() {
        try {
            const variants = await this.variantsRepository.find();
            const data = await Promise.all(
                variants.map(async (variant) => {
                    const product = await this.productsRepository.findOne({
                        where: { _id: new mongodb_1.ObjectId(variant.productId) },
                    });
                    return {
                        _id: variant._id,
                        name: `${product?.name ?? 'Unknown'} ${variant.color}/${variant.size}`,
                    };
                })
            );
            return data;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variants');
            return [];
        }
    }
    async getVariantInfo(variantId, additionalInfo) {
        try {
            const variant = await this.variantsRepository.findOne({
                where: { _id: new mongodb_1.ObjectId(variantId) },
            });
            if (!variant) {
                throw new common_1.NotFoundException('Variant not found');
            }
            const product = await this.productsRepository.findOne({
                where: { _id: new mongodb_1.ObjectId(variant.productId) },
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return `${product.name} ${variant.color}/${variant.size} - ${additionalInfo}`;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variant info');
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
    async setVariants(createVariants) {
        try {
            await this.deleteVariantsByProductId(createVariants.productId);
            await this.stockService.removeByVariantId(createVariants.oldVariantIds);
            for (const variant of createVariants.variants) {
                const newVariantId = await this.add({
                    size: variant.size,
                    color: variant.color,
                    productId: createVariants.productId,
                });
                await this.stockService.add({
                    total: variant.quantity,
                    variantId: newVariantId.toString(),
                });
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set variants');
            return { success: false };
        }
    }
    async canSaveVariants({ variantIds }) {
        try {
            let canSaveVariants = true;
            for (const id of variantIds) {
                const mongoRepository = this.ordersRepository;
                const orders = await mongoRepository.find({
                    where: {
                        variants: { $elemMatch: { _id: id } },
                    },
                });
                if (orders.length) {
                    canSaveVariants = false;
                    break;
                }
            }
            return { canSaveVariants };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add inventory');
            return { canSaveVariants: false };
        }
    }
};
exports.VariantsService = VariantsService;
exports.VariantsService = VariantsService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, typeorm_1.InjectRepository)(variant_entity_1.Variant)),
        tslib_1.__param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
        tslib_1.__param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository,
            stock_service_1.StockService,
            error_service_1.ErrorService,
        ]),
    ],
    VariantsService
);
//# sourceMappingURL=variants.service.js.map
