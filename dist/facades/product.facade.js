'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductFacade = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const additional_costs_service_1 = require('../services/additional-costs.service');
const development_costs_service_1 = require('../services/development-costs.service');
const error_service_1 = require('../services/error.service');
const manufacturing_costs_service_1 = require('../services/manufacturing-costs.service');
const products_service_1 = require('../services/products.service');
const stock_service_1 = require('../services/stock.service');
const variants_service_1 = require('../services/variants.service');
let ProductFacade = class ProductFacade {
    constructor(
        errorService,
        productsService,
        additionalCostsService,
        developmentCostsService,
        variantsService,
        stockService,
        manufacturingCostsService
    ) {
        this.errorService = errorService;
        this.productsService = productsService;
        this.additionalCostsService = additionalCostsService;
        this.developmentCostsService = developmentCostsService;
        this.variantsService = variantsService;
        this.stockService = stockService;
        this.manufacturingCostsService = manufacturingCostsService;
    }
    async getAll() {
        try {
            const res = [];
            const products = await this.productsService.getAll();
            for (const product of products) {
                const additionalCost =
                    await this.additionalCostsService.getAdditionalCostByProductId(product._id);
                const developmentCosts = await this.developmentCostsService.getByProductId(
                    product._id
                );
                const variants = await this.variantsService.getByProductId(product._id.toString());
                const manufacturingCost = await this.manufacturingCostsService.getByProductId(
                    product._id
                );
                const resVariants = [];
                for (const variant of variants) {
                    const stock = await this.stockService.getByVariantId(variant._id.toString());
                    resVariants.push({
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
                res.push({
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    variants: resVariants,
                    developmentCosts: developmentCosts?.map((val) => ({
                        _id: val._id,
                        date: val.date,
                        description: val.description,
                        cost: val.cost,
                    })),
                    additionalCost: { _id: additionalCost?._id, cost: additionalCost?.cost },
                    manufacturingCost: {
                        _id: manufacturingCost._id,
                        inventory: manufacturingCost.inventory,
                        job: manufacturingCost.job,
                    },
                });
            }
            return res;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all products');
            return [];
        }
    }
    async add(product) {
        try {
            const existingProduct = await this.productsService.getProductByNameWithoutCheck(
                product.name
            );
            if (existingProduct) {
                throw new common_1.ConflictException(
                    'A product with the given name already exists'
                );
            }
            const newProduct = await this.productsService.add(product);
            await this.additionalCostsService.addOne({
                productId: newProduct._id.toString(),
            });
            await this.manufacturingCostsService.create({
                productId: newProduct._id.toString(),
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
            products_service_1.ProductsService,
            additional_costs_service_1.AdditionalCostsService,
            development_costs_service_1.DevelopmentCostsService,
            variants_service_1.VariantsService,
            stock_service_1.StockService,
            manufacturing_costs_service_1.ManufacturingCostsService,
        ]),
    ],
    ProductFacade
);
//# sourceMappingURL=product.facade.js.map
