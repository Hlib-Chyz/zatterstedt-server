'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VariantFacade = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const error_service_1 = require('../services/error.service');
const orders_service_1 = require('../services/orders.service');
const products_service_1 = require('../services/products.service');
const stock_service_1 = require('../services/stock.service');
const variants_service_1 = require('../services/variants.service');
const mongodb_1 = require('mongodb');
let VariantFacade = class VariantFacade {
    constructor(stockService, variantsService, productsService, ordersService, errorService) {
        this.stockService = stockService;
        this.variantsService = variantsService;
        this.productsService = productsService;
        this.ordersService = ordersService;
        this.errorService = errorService;
    }
    async getVariants() {
        try {
            const variants = await this.variantsService.getAll();
            const data = await Promise.all(
                variants.map(async (variant) => {
                    const product = await this.productsService.getProduct(
                        new mongodb_1.ObjectId(variant.productId)
                    );
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
            const variant = await this.variantsService.getVariant(
                new mongodb_1.ObjectId(variantId)
            );
            if (!variant) {
                throw new common_1.NotFoundException('Variant not found');
            }
            const product = await this.productsService.getProduct(
                new mongodb_1.ObjectId(variant.productId)
            );
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return `${product.name} ${variant.color}/${variant.size} - ${additionalInfo}`;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variant info');
            return '';
        }
    }
    async setVariants(createVariants) {
        try {
            await this.variantsService.deleteVariantsByProductId(createVariants.productId);
            await this.stockService.removeByVariantId(createVariants.oldVariantIds);
            for (const variant of createVariants.variants) {
                const newVariantId = await this.variantsService.add({
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
                const orders = await this.ordersService.getByVariantId(id);
                if (orders.length) {
                    canSaveVariants = false;
                    break;
                }
            }
            return { canSaveVariants };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get canSaveVariants property');
            return { canSaveVariants: false };
        }
    }
};
exports.VariantFacade = VariantFacade;
exports.VariantFacade = VariantFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__metadata('design:paramtypes', [
            stock_service_1.StockService,
            variants_service_1.VariantsService,
            products_service_1.ProductsService,
            orders_service_1.OrdersService,
            error_service_1.ErrorService,
        ]),
    ],
    VariantFacade
);
//# sourceMappingURL=variant.facade.js.map
