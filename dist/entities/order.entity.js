"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const order_dto_1 = require("../dto/order.dto");
const typeorm_1 = require("typeorm");
let Order = class Order {
};
exports.Order = Order;
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], Order.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "clientId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => order_dto_1.VariantOrderDto),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "variants", void 0);
exports.Order = Order = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Order);
//# sourceMappingURL=order.entity.js.map