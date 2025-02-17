"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentCostSchema = exports.DevelopmentCost = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./product.schema");
let DevelopmentCost = class DevelopmentCost {
};
exports.DevelopmentCost = DevelopmentCost;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    tslib_1.__metadata("design:type", Date)
], DevelopmentCost.prototype, "date", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], DevelopmentCost.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    tslib_1.__metadata("design:type", Number)
], DevelopmentCost.prototype, "cost", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: product_schema_1.Product.name, required: true }),
    tslib_1.__metadata("design:type", mongoose_2.Types.ObjectId)
], DevelopmentCost.prototype, "productId", void 0);
exports.DevelopmentCost = DevelopmentCost = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], DevelopmentCost);
exports.DevelopmentCostSchema = mongoose_1.SchemaFactory.createForClass(DevelopmentCost);
exports.DevelopmentCostSchema.index({ date: 1, description: 1, cost: 1 }, { unique: true });
//# sourceMappingURL=development-cost.schema.js.map