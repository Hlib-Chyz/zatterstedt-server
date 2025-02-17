'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductFacade = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const additional_cost_service_1 = require('../services/additional-cost.service');
const development_cost_service_1 = require('../services/development-cost.service');
const error_service_1 = require('../services/error.service');
const manufacturing_cost_service_1 = require('../services/manufacturing-cost.service');
const product_service_1 = require('../services/product.service');
const stock_service_1 = require('../services/stock.service');
const variant_service_1 = require('../services/variant.service');
const product_dto_1 = require('../dto/product.dto');
let ProductFacade = class ProductFacade {
    constructor(
        errorService,
        productService,
        additionalCostService,
        developmentCostService,
        variantService,
        stockService,
        manufacturingCostService
    ) {
        this.errorService = errorService;
        this.productService = productService;
        this.additionalCostService = additionalCostService;
        this.developmentCostService = developmentCostService;
        this.variantService = variantService;
        this.stockService = stockService;
        this.manufacturingCostService = manufacturingCostService;
    }
    async getAll() {
        try {
            const res = [];
            const products = await this.productService.getAll();
            for (const product of products) {
                const additionalCost = await this.additionalCostService.getByProductId(product._id);
                const developmentCosts = await this.developmentCostService.getByProductId(
                    product._id
                );
                const variants = await this.variantService.getAllByProductId(product._id);
                const manufacturingCost = await this.manufacturingCostService.getByProductId(
                    product._id
                );
                const resVariant = [];
                for (const variant of variants) {
                    const stock = await this.stockService.getByVariantId(variant._id);
                    resVariant.push({
                        _id: variant._id,
                        size: variant.size,
                        color: variant.color,
                        stock: {
                            total: stock.total,
                            sold: stock.sold,
                            realizedParty: stock.realizedParty,
                        },
                    });
                }
                res.push(
                    new product_dto_1.ProductDto({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        variants: resVariant,
                        developmentCosts: developmentCosts?.map(
                            (val) =>
                                new product_dto_1.ProductDevelopmentCostDto({
                                    _id: val._id,
                                    date: val.date,
                                    description: val.description,
                                    cost: val.cost,
                                })
                        ),
                        additionalCost: new product_dto_1.ProductAdditionalCostDto({
                            _id: additionalCost._id,
                            cost: additionalCost.cost,
                        }),
                        manufacturingCost: new product_dto_1.ProductManufacturingCostDto({
                            _id: manufacturingCost._id,
                            inventory: manufacturingCost.inventory,
                            job: manufacturingCost.job,
                        }),
                    })
                );
            }
            return res;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all products');
            return [];
        }
    }
    async add(product) {
        try {
            const existingProduct = await this.productService.getByNameWithoutCheck(product.name);
            if (existingProduct) {
                throw new common_1.ConflictException(
                    'A product with the given name already exists'
                );
            }
            const newProduct = await this.productService.add(product);
            await this.additionalCostService.add({
                productId: newProduct._id,
            });
            await this.manufacturingCostService.add({
                productId: newProduct._id,
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new product');
            return { success: false };
        }
    }
};
exports.ProductFacade = ProductFacade;
exports.ProductFacade = ProductFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__metadata('design:paramtypes', [
            error_service_1.ErrorService,
            product_service_1.ProductService,
            additional_cost_service_1.AdditionalCostService,
            development_cost_service_1.DevelopmentCostService,
            variant_service_1.VariantService,
            stock_service_1.StockService,
            manufacturing_cost_service_1.ManufacturingCostService,
        ]),
    ],
    ProductFacade
);
//# sourceMappingURL=product.facade.js.map
