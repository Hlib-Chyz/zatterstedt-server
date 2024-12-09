"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const tslib_1 = require("tslib");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const product_dto_1 = require("../dto/product.dto");
const shared_dto_1 = require("../dto/shared.dto");
const error_filter_1 = require("../filters/error.filter");
const products_service_1 = require("../services/products.service");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async getAllProductsForAdmin() {
        return this.productsService.getAllProductsForAdmin();
    }
    async createProduct(product) {
        return this.productsService.add(product);
    }
    async updateProduct(product) {
        return this.productsService.update(product);
    }
    async changePrice(id, { price }) {
        return this.productsService.changePrice(id, price);
    }
};
exports.ProductsController = ProductsController;
tslib_1.__decorate([
    (0, common_1.Get)('admin'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "getAllProductsForAdmin", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [product_dto_1.CreateProductDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
tslib_1.__decorate([
    (0, common_1.Put)(),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [product_dto_1.UpdateProductDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
tslib_1.__decorate([
    (0, common_1.Put)('price/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [mongodb_1.ObjectId,
        product_dto_1.ProductPriceDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductsController.prototype, "changePrice", null);
exports.ProductsController = ProductsController = tslib_1.__decorate([
    (0, common_1.Controller)('products'),
    (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map