'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UpdateAdditionalCostDto = void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongoose_1 = require('mongoose');
class UpdateAdditionalCostDto {}
exports.UpdateAdditionalCostDto = UpdateAdditionalCostDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    UpdateAdditionalCostDto.prototype,
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
    UpdateAdditionalCostDto.prototype,
    'cost',
    void 0
);
//# sourceMappingURL=additional-cost.dto.js.map
