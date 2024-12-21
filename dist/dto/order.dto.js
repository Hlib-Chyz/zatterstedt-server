'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VariantOrderDto =
    exports.OrderVariantDto =
    exports.OrderDto =
    exports.CreateOrderDto =
        void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongodb_1 = require('mongodb');
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
    'contacts',
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
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsMongoId)(),
        tslib_1.__metadata('design:type', String),
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
class OrderDto {}
exports.OrderDto = OrderDto;
tslib_1.__decorate(
    [(0, class_validator_1.IsNotEmpty)(), tslib_1.__metadata('design:type', mongodb_1.ObjectId)],
    OrderDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    OrderDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
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
class OrderVariantDto {}
exports.OrderVariantDto = OrderVariantDto;
tslib_1.__decorate(
    [(0, class_validator_1.IsNotEmpty)(), tslib_1.__metadata('design:type', mongodb_1.ObjectId)],
    OrderVariantDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    OrderVariantDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    OrderVariantDto.prototype,
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
    OrderVariantDto.prototype,
    'variants',
    void 0
);
class VariantOrderDto {}
exports.VariantOrderDto = VariantOrderDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsMongoId)(),
        tslib_1.__metadata('design:type', String),
    ],
    VariantOrderDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
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
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Number),
    ],
    VariantOrderDto.prototype,
    'price',
    void 0
);
//# sourceMappingURL=order.dto.js.map
