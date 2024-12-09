"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = exports.ProductPriceDto = exports.UpdateProductDto = exports.CreateProductDto = exports.ProductAdminDto = exports.ProductVariantDto = exports.ProductStockDto = exports.ProductManufacturingCostDto = exports.ProductManufacturingCostInventoryDto = exports.ProductManufacturingCostJobDto = exports.ProductAdditionalCostDto = exports.ProductDevelopmentCostDto = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
class ProductDevelopmentCostDto {
}
exports.ProductDevelopmentCostDto = ProductDevelopmentCostDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], ProductDevelopmentCostDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], ProductDevelopmentCostDto.prototype, "date", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProductDevelopmentCostDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], ProductDevelopmentCostDto.prototype, "cost", void 0);
class ProductAdditionalCostDto {
}
exports.ProductAdditionalCostDto = ProductAdditionalCostDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], ProductAdditionalCostDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], ProductAdditionalCostDto.prototype, "cost", void 0);
class ProductManufacturingCostJobDto {
}
exports.ProductManufacturingCostJobDto = ProductManufacturingCostJobDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProductManufacturingCostJobDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], ProductManufacturingCostJobDto.prototype, "cost", void 0);
class ProductManufacturingCostInventoryDto {
}
exports.ProductManufacturingCostInventoryDto = ProductManufacturingCostInventoryDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", String)
], ProductManufacturingCostInventoryDto.prototype, "inventoryId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], ProductManufacturingCostInventoryDto.prototype, "quantityInUse", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], ProductManufacturingCostInventoryDto.prototype, "quantityInCost", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], ProductManufacturingCostInventoryDto.prototype, "duringManufacture", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], ProductManufacturingCostInventoryDto.prototype, "cost", void 0);
class ProductManufacturingCostDto {
}
exports.ProductManufacturingCostDto = ProductManufacturingCostDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], ProductManufacturingCostDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductManufacturingCostJobDto),
    tslib_1.__metadata("design:type", Array)
], ProductManufacturingCostDto.prototype, "job", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductManufacturingCostInventoryDto),
    tslib_1.__metadata("design:type", Array)
], ProductManufacturingCostDto.prototype, "inventory", void 0);
class ProductStockDto {
}
exports.ProductStockDto = ProductStockDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductStockDto.prototype, "total", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductStockDto.prototype, "sold", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductStockDto.prototype, "realizedParty", void 0);
class ProductVariantDto {
}
exports.ProductVariantDto = ProductVariantDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], ProductVariantDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ProductVariantDto.prototype, "size", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ProductVariantDto.prototype, "color", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => ProductStockDto),
    tslib_1.__metadata("design:type", ProductStockDto)
], ProductVariantDto.prototype, "stock", void 0);
class ProductAdminDto {
}
exports.ProductAdminDto = ProductAdminDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], ProductAdminDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ProductAdminDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], ProductAdminDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductAdminDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductVariantDto),
    tslib_1.__metadata("design:type", Array)
], ProductAdminDto.prototype, "variants", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductDevelopmentCostDto),
    tslib_1.__metadata("design:type", Array)
], ProductAdminDto.prototype, "developmentCosts", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => ProductAdditionalCostDto),
    tslib_1.__metadata("design:type", ProductAdditionalCostDto)
], ProductAdminDto.prototype, "additionalCost", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => ProductManufacturingCostDto),
    tslib_1.__metadata("design:type", ProductManufacturingCostDto)
], ProductAdminDto.prototype, "manufacturingCost", void 0);
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
class UpdateProductDto {
}
exports.UpdateProductDto = UpdateProductDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => new mongodb_1.ObjectId(value)),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], UpdateProductDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
class ProductPriceDto {
}
exports.ProductPriceDto = ProductPriceDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], ProductPriceDto.prototype, "price", void 0);
class ProductDto {
}
exports.ProductDto = ProductDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], ProductDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProductDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], ProductDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ProductDto.prototype, "description", void 0);
//# sourceMappingURL=product.dto.js.map