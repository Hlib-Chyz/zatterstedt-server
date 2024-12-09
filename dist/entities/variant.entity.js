"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
let Variant = class Variant {
};
exports.Variant = Variant;
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], Variant.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Variant.prototype, "color", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Variant.prototype, "size", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", String)
], Variant.prototype, "productId", void 0);
exports.Variant = Variant = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Variant);
//# sourceMappingURL=variant.entity.js.map