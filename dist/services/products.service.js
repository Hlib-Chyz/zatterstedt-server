'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductsService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const mongodb_1 = require('mongodb');
const product_entity_1 = require('../entities/product.entity');
const typeorm_2 = require('typeorm');
const additional_costs_service_1 = require('./additional-costs.service');
const development_costs_service_1 = require('./development-costs.service');
const error_service_1 = require('./error.service');
const manufacturing_costs_service_1 = require('./manufacturing-costs.service');
const stock_service_1 = require('./stock.service');
const variants_service_1 = require('./variants.service');
let ProductsService = class ProductsService {
    constructor(
        productsRepository,
        errorService,
        additionalCostsService,
        developmentCostsService,
        variantsService,
        stockService,
        manufacturingCostsService
    ) {
        this.productsRepository = productsRepository;
        this.errorService = errorService;
        this.additionalCostsService = additionalCostsService;
        this.developmentCostsService = developmentCostsService;
        this.variantsService = variantsService;
        this.stockService = stockService;
        this.manufacturingCostsService = manufacturingCostsService;
    }
    async getAllProductsForAdmin() {
        try {
            const res = [];
            const products = await this.productsRepository.find();
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
            const existingProduct = await this.productsRepository.findOne({
                where: { name: product.name },
            });
            if (existingProduct) {
                throw new common_1.ConflictException(
                    'A product with the given name already exists'
                );
            }
            const newProduct = await this.productsRepository.save({
                name: product.name,
                price: product.price,
                description: product.description,
            });
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
    async update(product) {
        try {
            await this.getProduct(new mongodb_1.ObjectId(product._id));
            await this.productsRepository.save(product);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update a product');
            return { success: true };
        }
    }
    async getOneById(productId) {
        try {
            const product = await this.getProduct(new mongodb_1.ObjectId(productId));
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get one product');
            return {};
        }
    }
    async changePrice(productId, newPrice) {
        try {
            const product = await this.getOneById(productId);
            product.price = newPrice;
            await this.productsRepository.save(product);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change price of product');
            return { success: false };
        }
    }
    async getProduct(_id) {
        const product = await this.productsRepository.findOne({
            where: { _id },
        });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            error_service_1.ErrorService,
            additional_costs_service_1.AdditionalCostsService,
            development_costs_service_1.DevelopmentCostsService,
            variants_service_1.VariantsService,
            stock_service_1.StockService,
            manufacturing_costs_service_1.ManufacturingCostsService,
        ]),
    ],
    ProductsService
);
//# sourceMappingURL=products.service.js.map
