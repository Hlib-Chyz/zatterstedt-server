'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderDto = exports.VariantOrderDto = exports.CreateOrderDto = void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongoose_1 = require('mongoose');
class CreateOrderDto {}
exports.CreateOrderDto = CreateOrderDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateOrderDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [(0, class_validator_1.IsString)(), tslib_1.__metadata('design:type', String)],
    CreateOrderDto.prototype,
    'contact',
    void 0
);
tslib_1.__decorate(
    [(0, class_validator_1.IsString)(), tslib_1.__metadata('design:type', String)],
    CreateOrderDto.prototype,
    'clientName',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.ValidateIf)((_, value) => Boolean(value)),
        (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    CreateOrderDto.prototype,
    'clientId',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(() => VariantOrderDto),
        tslib_1.__metadata('design:type', Array),
    ],
    CreateOrderDto.prototype,
    'variants',
    void 0
);
class VariantOrderDto {}
exports.VariantOrderDto = VariantOrderDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsMongoId)(),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    VariantOrderDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Number),
    ],
    VariantOrderDto.prototype,
    'quantity',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Number),
    ],
    VariantOrderDto.prototype,
    'price',
    void 0
);
class OrderDto {}
exports.OrderDto = OrderDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    OrderDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDate)(),
        tslib_1.__metadata('design:type', Date),
    ],
    OrderDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    OrderDto.prototype,
    'orderNumber',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    OrderDto.prototype,
    'client',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ArrayNotEmpty)(),
        (0, class_validator_1.IsString)({ each: true }),
        tslib_1.__metadata('design:type', Array),
    ],
    OrderDto.prototype,
    'variants',
    void 0
);
//# sourceMappingURL=order.dto.js.map
