'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const product_schema_1 = require('../schemas/product.schema');
const error_service_1 = require('./error.service');
let ProductService = class ProductService {
    constructor(productModel, errorService) {
        this.productModel = productModel;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            return this.productModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get products');
            return [];
        }
    }
    async update(product) {
        try {
            const result = await this.productModel.findByIdAndUpdate(product._id, product).exec();
            if (!result) {
                throw new common_1.NotFoundException('Product not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update a product');
        }
    }
    async updatePrice(productId, price) {
        try {
            const updatedProduct = await this.productModel
                .findByIdAndUpdate(productId, { price })
                .exec();
            if (!updatedProduct) {
                throw new common_1.NotFoundException('Product not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change price of product');
        }
    }
    async getByName(name) {
        try {
            const product = await this.productModel.findOne({ name }).exec();
            if (!product) {
                throw new common_1.NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return {};
        }
    }
    async getByNameWithoutCheck(name) {
        try {
            return await this.productModel.findOne({ name }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return null;
        }
    }
    async add(product) {
        try {
            const newProduct = new this.productModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add product');
            return {};
        }
    }
    async getById(id) {
        try {
            const product = await this.productModel.findById(id).exec();
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
exports.ProductService = ProductService;
exports.ProductService = ProductService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
        tslib_1.__metadata('design:paramtypes', [mongoose_2.Model, error_service_1.ErrorService]),
    ],
    ProductService
);
//# sourceMappingURL=product.service.js.map
