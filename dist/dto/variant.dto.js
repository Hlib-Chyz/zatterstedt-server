"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanSaveVariantsResponseDto = exports.CanSaveVariantsDto = exports.CreateVariantsDto = exports.VariantLockupDto = exports.CreateVariantDto = exports.VariantDto = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
class VariantDto {
}
exports.VariantDto = VariantDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], VariantDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VariantDto.prototype, "color", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VariantDto.prototype, "size", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", String)
], VariantDto.prototype, "productId", void 0);
class CreateVariantDto {
}
exports.CreateVariantDto = CreateVariantDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateVariantDto.prototype, "color", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateVariantDto.prototype, "size", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", String)
], CreateVariantDto.prototype, "productId", void 0);
class VariantLockupDto {
}
exports.VariantLockupDto = VariantLockupDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], VariantLockupDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VariantLockupDto.prototype, "name", void 0);
class VariantUpdateDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VariantUpdateDto.prototype, "size", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VariantUpdateDto.prototype, "color", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], VariantUpdateDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], VariantUpdateDto.prototype, "realizedParty", void 0);
class CreateVariantsDto {
}
exports.CreateVariantsDto = CreateVariantsDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", String)
], CreateVariantsDto.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => VariantUpdateDto),
    tslib_1.__metadata("design:type", Array)
], CreateVariantsDto.prototype, "variants", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CreateVariantsDto.prototype, "oldVariantIds", void 0);
class CanSaveVariantsDto {
}
exports.CanSaveVariantsDto = CanSaveVariantsDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    tslib_1.__metadata("design:type", Array)
], CanSaveVariantsDto.prototype, "variantIds", void 0);
class CanSaveVariantsResponseDto {
}
exports.CanSaveVariantsResponseDto = CanSaveVariantsResponseDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CanSaveVariantsResponseDto.prototype, "canSaveVariants", void 0);
//# sourceMappingURL=variant.dto.js.map