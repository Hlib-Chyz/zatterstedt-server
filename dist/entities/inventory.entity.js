"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
let Inventory = class Inventory {
};
exports.Inventory = Inventory;
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], Inventory.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Inventory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], Inventory.prototype, "totalCost", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], Inventory.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], Inventory.prototype, "used", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], Inventory.prototype, "paid", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], Inventory.prototype, "date", void 0);
exports.Inventory = Inventory = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Inventory);
//# sourceMappingURL=inventory.entity.js.map