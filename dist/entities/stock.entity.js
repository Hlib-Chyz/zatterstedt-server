"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
let Stock = class Stock {
};
exports.Stock = Stock;
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], Stock.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", String)
], Stock.prototype, "variantId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], Stock.prototype, "sold", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], Stock.prototype, "total", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], Stock.prototype, "realizedParty", void 0);
exports.Stock = Stock = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Stock);
//# sourceMappingURL=stock.entity.js.map