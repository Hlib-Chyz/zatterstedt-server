'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SetUsedFieldDto =
    exports.InventoryDto =
    exports.CreateInventoryDto =
    exports.UpdateInventoryDto =
        void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongoose_1 = require('mongoose');
class UpdateInventoryDto {}
exports.UpdateInventoryDto = UpdateInventoryDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    UpdateInventoryDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    UpdateInventoryDto.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    UpdateInventoryDto.prototype,
    'totalCost',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    UpdateInventoryDto.prototype,
    'amount',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    UpdateInventoryDto.prototype,
    'used',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    UpdateInventoryDto.prototype,
    'date',
    void 0
);
class CreateInventoryDto {}
exports.CreateInventoryDto = CreateInventoryDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateInventoryDto.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    CreateInventoryDto.prototype,
    'totalCost',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    CreateInventoryDto.prototype,
    'amount',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    CreateInventoryDto.prototype,
    'used',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateInventoryDto.prototype,
    'date',
    void 0
);
class InventoryDto {}
exports.InventoryDto = InventoryDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    InventoryDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    InventoryDto.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryDto.prototype,
    'totalCost',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryDto.prototype,
    'amount',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryDto.prototype,
    'used',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryDto.prototype,
    'paid',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDate)(),
        tslib_1.__metadata('design:type', Date),
    ],
    InventoryDto.prototype,
    'date',
    void 0
);
class SetUsedFieldDto {}
exports.SetUsedFieldDto = SetUsedFieldDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    SetUsedFieldDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    SetUsedFieldDto.prototype,
    'used',
    void 0
);
//# sourceMappingURL=inventory.dto.js.map
