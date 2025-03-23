'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductFacade = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const development_cost_service_1 = require('../services/development-cost.service');
const error_service_1 = require('../services/error.service');
const manufacturing_cost_service_1 = require('../services/manufacturing-cost.service');
const product_service_1 = require('../services/product.service');
const stock_service_1 = require('../services/stock.service');
const variant_service_1 = require('../services/variant.service');
const class_transformer_1 = require('class-transformer');
const mongoose_2 = require('mongoose');
const product_dto_1 = require('../dto/product.dto');
let ProductFacade = class ProductFacade {
    constructor(
        errorService,
        productService,
        developmentCostService,
        variantService,
        stockService,
        manufacturingCostService,
        connection
    ) {
        this.errorService = errorService;
        this.productService = productService;
        this.developmentCostService = developmentCostService;
        this.variantService = variantService;
        this.stockService = stockService;
        this.manufacturingCostService = manufacturingCostService;
        this.connection = connection;
    }
    async getAll() {
        try {
            const products = await this.productService.getAll();
            const res = await Promise.all(
                products.map(async (product) => {
                    const [developmentCosts, variants, manufacturingCost] = await Promise.all([
                        this.developmentCostService.getAllByProductId(product._id),
                        this.variantService.getAllByProductId(product._id),
                        this.manufacturingCostService.getByProductId(product._id),
                    ]);
                    const resVariant = await Promise.all(
                        variants.map(async (variant) => {
                            const stock = await this.stockService.getByVariantId(variant._id);
                            return {
                                _id: variant._id,
                                size: variant.size,
                                color: variant.color,
                                stock: {
                                    total: stock.total,
                                    sold: stock.sold,
                                    realizedParty: stock.realizedParty,
                                },
                            };
                        })
                    );
                    console.log(developmentCosts);
                    return {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        variants: resVariant,
                        developmentCosts,
                        manufacturingCost: {
                            _id: manufacturingCost._id,
                            inventory: manufacturingCost.inventory,
                            job: manufacturingCost.job,
                        },
                    };
                })
            );
            return (0, class_transformer_1.plainToInstance)(product_dto_1.ProductDto, res, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all products');
            return [];
        }
    }
    async add(product) {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const newProduct = await this.productService.add(product, session);
            await this.manufacturingCostService.add(newProduct._id, session);
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.errorService.throwError(error, 'Failed to create a new product');
        } finally {
            session.endSession();
        }
    }
};
exports.ProductFacade = ProductFacade;
exports.ProductFacade = ProductFacade = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(6, (0, mongoose_1.InjectConnection)()),
        tslib_1.__metadata('design:paramtypes', [
            error_service_1.ErrorService,
            product_service_1.ProductService,
            development_cost_service_1.DevelopmentCostService,
            variant_service_1.VariantService,
            stock_service_1.StockService,
            manufacturing_cost_service_1.ManufacturingCostService,
            mongoose_2.Connection,
        ]),
    ],
    ProductFacade
);
//# sourceMappingURL=product.facade.js.map
