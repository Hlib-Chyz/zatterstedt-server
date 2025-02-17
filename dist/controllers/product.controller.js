'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductController = void 0;
const tslib_1 = require('tslib');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const common_1 = require('@nestjs/common');
const mongodb_1 = require('mongodb');
const product_dto_1 = require('../dto/product.dto');
const shared_dto_1 = require('../dto/shared.dto');
const product_facade_1 = require('../facades/product.facade');
const error_filter_1 = require('../filters/error.filter');
const product_service_1 = require('../services/product.service');
let ProductController = class ProductController {
    constructor(productService, productFacade) {
        this.productService = productService;
        this.productFacade = productFacade;
    }
    async getAll() {
        return this.productFacade.getAll();
    }
    async add(product) {
        return this.productFacade.add(product);
    }
    async update(product) {
        return this.productService.update(product);
    }
    async updatePrice(id, { price }) {
        return this.productService.updatePrice(id, price);
    }
};
exports.ProductController = ProductController;
tslib_1.__decorate(
    [
        (0, common_1.Get)(),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', []),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    ProductController.prototype,
    'getAll',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Post)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [product_dto_1.CreateProductDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    ProductController.prototype,
    'add',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Put)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [product_dto_1.UpdateProductDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    ProductController.prototype,
    'update',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Put)('price/:id'),
        tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
        tslib_1.__param(1, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [
            mongodb_1.ObjectId,
            product_dto_1.ProductPriceDto,
        ]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    ProductController.prototype,
    'updatePrice',
    null
);
exports.ProductController = ProductController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('product'),
        (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [
            product_service_1.ProductService,
            product_facade_1.ProductFacade,
        ]),
    ],
    ProductController
);
//# sourceMappingURL=product.controller.js.map
