'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CanSaveInventoryResponseDto =
    exports.CanSaveInventoryDto =
    exports.InventoryDto =
    exports.JobDto =
    exports.ManufacturingCostInventoryDto =
    exports.ManufacturingCostJobDto =
    exports.CreateManufacturingCostDto =
    exports.ManufacturingCostDto =
        void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongodb_1 = require('mongodb');
const mongoose_1 = require('mongoose');
class ManufacturingCostDto {}
exports.ManufacturingCostDto = ManufacturingCostDto;
tslib_1.__decorate(
    [(0, class_validator_1.IsNotEmpty)(), tslib_1.__metadata('design:type', mongodb_1.ObjectId)],
    ManufacturingCostDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsMongoId)(),
        tslib_1.__metadata('design:type', String),
    ],
    ManufacturingCostDto.prototype,
    'productId',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(() => JobDto),
        tslib_1.__metadata('design:type', Array),
    ],
    ManufacturingCostDto.prototype,
    'job',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(() => InventoryDto),
        tslib_1.__metadata('design:type', Array),
    ],
    ManufacturingCostDto.prototype,
    'inventory',
    void 0
);
class CreateManufacturingCostDto {}
exports.CreateManufacturingCostDto = CreateManufacturingCostDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsMongoId)(),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    CreateManufacturingCostDto.prototype,
    'productId',
    void 0
);
class ManufacturingCostJobDto {}
exports.ManufacturingCostJobDto = ManufacturingCostJobDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(() => JobDto),
        tslib_1.__metadata('design:type', Array),
    ],
    ManufacturingCostJobDto.prototype,
    'job',
    void 0
);
class ManufacturingCostInventoryDto {}
exports.ManufacturingCostInventoryDto = ManufacturingCostInventoryDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(() => InventoryDto),
        tslib_1.__metadata('design:type', Array),
    ],
    ManufacturingCostInventoryDto.prototype,
    'inventory',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(() => InventoryDto),
        tslib_1.__metadata('design:type', Array),
    ],
    ManufacturingCostInventoryDto.prototype,
    'oldInventory',
    void 0
);
class JobDto {}
exports.JobDto = JobDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    JobDto.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Number),
    ],
    JobDto.prototype,
    'cost',
    void 0
);
class InventoryDto {}
exports.InventoryDto = InventoryDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    InventoryDto.prototype,
    'inventoryId',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryDto.prototype,
    'quantityInCost',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryDto.prototype,
    'quantityInUse',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsBoolean)(),
        tslib_1.__metadata('design:type', Boolean),
    ],
    InventoryDto.prototype,
    'duringManufacture',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryDto.prototype,
    'cost',
    void 0
);
class CanSaveInventoryDto {}
exports.CanSaveInventoryDto = CanSaveInventoryDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsString)({ each: true }),
        (0, class_transformer_1.Transform)(({ value }) =>
            value.map((id) => new mongoose_1.Types.ObjectId(id))
        ),
        tslib_1.__metadata('design:type', Array),
    ],
    CanSaveInventoryDto.prototype,
    'variantIds',
    void 0
);
class CanSaveInventoryResponseDto {}
exports.CanSaveInventoryResponseDto = CanSaveInventoryResponseDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsBoolean)(),
        tslib_1.__metadata('design:type', Boolean),
    ],
    CanSaveInventoryResponseDto.prototype,
    'canSaveInventory',
    void 0
);
//# sourceMappingURL=manufacturing-cost.dto.js.map
