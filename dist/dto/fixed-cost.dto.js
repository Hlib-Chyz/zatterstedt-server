'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FixedCostDto = exports.UpdateFixedCostDto = exports.CreateFixedCostDto = void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongoose_1 = require('mongoose');
class CreateFixedCostDto {}
exports.CreateFixedCostDto = CreateFixedCostDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateFixedCostDto.prototype,
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
    CreateFixedCostDto.prototype,
    'cost',
    void 0
);
class UpdateFixedCostDto {}
exports.UpdateFixedCostDto = UpdateFixedCostDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    UpdateFixedCostDto.prototype,
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
    UpdateFixedCostDto.prototype,
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
    UpdateFixedCostDto.prototype,
    'cost',
    void 0
);
class FixedCostDto {}
exports.FixedCostDto = FixedCostDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    FixedCostDto.prototype,
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
    FixedCostDto.prototype,
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
    FixedCostDto.prototype,
    'cost',
    void 0
);
//# sourceMappingURL=fixed-cost.dto.js.map
