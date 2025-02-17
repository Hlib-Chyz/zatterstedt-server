"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockSchema = exports.Stock = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const variant_schema_1 = require("./variant.schema");
let Stock = class Stock {
};
exports.Stock = Stock;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, unique: true, ref: variant_schema_1.Variant.name }),
    tslib_1.__metadata("design:type", mongoose_2.Types.ObjectId)
], Stock.prototype, "variantId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    tslib_1.__metadata("design:type", Number)
], Stock.prototype, "sold", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    tslib_1.__metadata("design:type", Number)
], Stock.prototype, "total", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    tslib_1.__metadata("design:type", Number)
], Stock.prototype, "realizedParty", void 0);
exports.Stock = Stock = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Stock);
exports.StockSchema = mongoose_1.SchemaFactory.createForClass(Stock);
//# sourceMappingURL=stock.schema.js.map