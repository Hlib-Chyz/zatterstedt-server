'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VariantFacade = void 0;
const tslib_1 = require('tslib');
const variant_dto_1 = require('../dto/variant.dto');
const common_1 = require('@nestjs/common');
const error_service_1 = require('../services/error.service');
const order_service_1 = require('../services/order.service');
const product_service_1 = require('../services/product.service');
const stock_service_1 = require('../services/stock.service');
const variant_service_1 = require('../services/variant.service');
const class_transformer_1 = require('class-transformer');
let VariantFacade = class VariantFacade {
    constructor(stockService, variantService, productService, orderService, errorService) {
        this.stockService = stockService;
        this.variantService = variantService;
        this.productService = productService;
        this.orderService = orderService;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            const variants = await this.variantService.getAll();
            const data = await Promise.all(
                variants.map(async (variant) => {
                    const product = await this.productService.getById(variant.productId);
                    return {
                        _id: variant._id,
                        name: `${product?.name ?? 'Unknown'} ${variant.color}/${variant.size}`,
                    };
                })
            );
            return (0, class_transformer_1.plainToInstance)(variant_dto_1.VariantLockupDto, data, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variants');
            return [];
        }
    }
    async getVariantInfo(variantId, additionalInfo) {
        try {
            const variant = await this.variantService.getById(variantId);
            if (!variant) {
                throw new common_1.NotFoundException('Variant not found');
            }
            const product = await this.productService.getById(variant.productId);
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return `${product.name} ${variant.color}/${variant.size} - ${additionalInfo}`;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variant info');
            return '';
        }
    }
    async updateVariant(createVariant) {
        try {
            await this.variantService.deleteManyByProductId(createVariant.productId);
            await this.stockService.deleteManyByVariantIds(createVariant.oldVariantIds);
            for (const variant of createVariant.variants) {
                const newVariantId = await this.variantService.add({
                    size: variant.size,
                    color: variant.color,
                    productId: createVariant.productId,
                });
                await this.stockService.add({
                    total: variant.quantity,
                    variantId: newVariantId,
                });
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set variants');
        }
    }
    async canSaveVariants({ variantIds }) {
        try {
            let canSaveVariant = true;
            for (const id of variantIds) {
                const orders = await this.orderService.getByVariantId(id);
                if (orders.length) {
                    canSaveVariant = false;
                    break;
                }
            }
            return (0, class_transformer_1.plainToInstance)(
                variant_dto_1.CanSaveVariantResponseDto,
                { canSaveVariant },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get canSaveVariant property');
            return (0, class_transformer_1.plainToInstance)(
                variant_dto_1.CanSaveVariantResponseDto,
                { canSaveVariant: false },
                { excludeExtraneousValues: true }
            );
        }
    }
};
exports.VariantFacade = VariantFacade;
exports.VariantFacade = VariantFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__metadata('design:paramtypes', [
            stock_service_1.StockService,
            variant_service_1.VariantService,
            product_service_1.ProductService,
            order_service_1.OrderService,
            error_service_1.ErrorService,
        ]),
    ],
    VariantFacade
);
//# sourceMappingURL=variant.facade.js.map
