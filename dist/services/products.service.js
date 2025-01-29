'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductsService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const mongodb_1 = require('mongodb');
const product_entity_1 = require('../entities/product.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
let ProductsService = class ProductsService {
    constructor(productsRepository, errorService) {
        this.productsRepository = productsRepository;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            return this.productsRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get products');
            return [];
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
    async changePrice(productId, newPrice) {
        try {
            const product = await this.getProduct(productId);
            product.price = newPrice;
            await this.productsRepository.save(product);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change price of product');
            return { success: false };
        }
    }
    async getProductByName(name) {
        try {
            const product = await this.productsRepository.findOne({
                where: { name },
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return {};
        }
    }
    async add(product) {
        try {
            const newProduct = await this.productsRepository.save({
                name: product.name,
                price: product.price,
                description: product.description,
            });
            return newProduct;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add product');
            return {};
        }
    }
    async getProduct(_id) {
        try {
            const product = await this.productsRepository.findOne({
                where: { _id },
            });
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return {};
        }
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
        ]),
    ],
    ProductsService
);
//# sourceMappingURL=products.service.js.map
