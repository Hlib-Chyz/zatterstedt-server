"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = exports.VariantSchema = exports.VariantItem = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const variant_schema_1 = require("./variant.schema");
const mongoose_2 = require("mongoose");
const client_schema_1 = require("./client.schema");
let VariantItem = class VariantItem {
};
exports.VariantItem = VariantItem;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, unique: true, ref: variant_schema_1.Variant.name }),
    tslib_1.__metadata("design:type", mongoose_2.Types.ObjectId)
], VariantItem.prototype, "variantId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    tslib_1.__metadata("design:type", Number)
], VariantItem.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    tslib_1.__metadata("design:type", Number)
], VariantItem.prototype, "price", void 0);
exports.VariantItem = VariantItem = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], VariantItem);
exports.VariantSchema = mongoose_1.SchemaFactory.createForClass(VariantItem);
let Order = class Order {
};
exports.Order = Order;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    tslib_1.__metadata("design:type", Date)
], Order.prototype, "date", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: client_schema_1.Client.name }),
    tslib_1.__metadata("design:type", mongoose_2.Types.ObjectId)
], Order.prototype, "clientId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: [exports.VariantSchema], required: true }),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "variants", void 0);
exports.Order = Order = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map