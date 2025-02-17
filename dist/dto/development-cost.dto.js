'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DevelopmentCostDto =
    exports.UpdateDevelopmentCostDto =
    exports.CreateDevelopmentCostDto =
        void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongodb_1 = require('mongodb');
const mongoose_1 = require('mongoose');
class CreateDevelopmentCostDto {}
exports.CreateDevelopmentCostDto = CreateDevelopmentCostDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateDevelopmentCostDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateDevelopmentCostDto.prototype,
    'description',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    CreateDevelopmentCostDto.prototype,
    'cost',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsMongoId)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateDevelopmentCostDto.prototype,
    'productId',
    void 0
);
class UpdateDevelopmentCostDto {}
exports.UpdateDevelopmentCostDto = UpdateDevelopmentCostDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    UpdateDevelopmentCostDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    UpdateDevelopmentCostDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    UpdateDevelopmentCostDto.prototype,
    'description',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    UpdateDevelopmentCostDto.prototype,
    'cost',
    void 0
);
class DevelopmentCostDto {}
exports.DevelopmentCostDto = DevelopmentCostDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', mongodb_1.ObjectId),
    ],
    DevelopmentCostDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsDateString)(),
        tslib_1.__metadata('design:type', String),
    ],
    DevelopmentCostDto.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    DevelopmentCostDto.prototype,
    'description',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    DevelopmentCostDto.prototype,
    'cost',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsMongoId)(),
        tslib_1.__metadata('design:type', String),
    ],
    DevelopmentCostDto.prototype,
    'productId',
    void 0
);
//# sourceMappingURL=development-cost.dto.js.map
