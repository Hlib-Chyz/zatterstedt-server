"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturingCost = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const manufacturing_cost_dto_1 = require("../dto/manufacturing-cost.dto");
const typeorm_1 = require("typeorm");
let ManufacturingCost = class ManufacturingCost {
    constructor() {
        this.job = [];
        this.inventory = [];
    }
};
exports.ManufacturingCost = ManufacturingCost;
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], ManufacturingCost.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", String)
], ManufacturingCost.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => manufacturing_cost_dto_1.JobDto),
    tslib_1.__metadata("design:type", Array)
], ManufacturingCost.prototype, "job", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => manufacturing_cost_dto_1.InventoryDto),
    tslib_1.__metadata("design:type", Array)
], ManufacturingCost.prototype, "inventory", void 0);
exports.ManufacturingCost = ManufacturingCost = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], ManufacturingCost);
//# sourceMappingURL=manufacturing-cost.entity.js.map