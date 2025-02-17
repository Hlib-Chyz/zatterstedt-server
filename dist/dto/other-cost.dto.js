'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OtherCostDto = exports.CreateOtherCostDto = exports.UpdateOtherCostDto = void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongodb_1 = require('mongodb');
const mongoose_1 = require('mongoose');
class UpdateOtherCostDto {}
exports.UpdateOtherCostDto = UpdateOtherCostDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    UpdateOtherCostDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    UpdateOtherCostDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    UpdateOtherCostDto.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    UpdateOtherCostDto.prototype,
    'cost',
    void 0
);
class CreateOtherCostDto {}
exports.CreateOtherCostDto = CreateOtherCostDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateOtherCostDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateOtherCostDto.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    CreateOtherCostDto.prototype,
    'cost',
    void 0
);
class OtherCostDto {}
exports.OtherCostDto = OtherCostDto;
tslib_1.__decorate(
    [(0, class_validator_1.IsNotEmpty)(), tslib_1.__metadata('design:type', mongodb_1.ObjectId)],
    OtherCostDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    OtherCostDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    OtherCostDto.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    OtherCostDto.prototype,
    'cost',
    void 0
);
//# sourceMappingURL=other-cost.dto.js.map
