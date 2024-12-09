"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherCost = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
let OtherCost = class OtherCost {
};
exports.OtherCost = OtherCost;
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], OtherCost.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], OtherCost.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], OtherCost.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OtherCost.prototype, "cost", void 0);
exports.OtherCost = OtherCost = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], OtherCost);
//# sourceMappingURL=other-cost.entity.js.map