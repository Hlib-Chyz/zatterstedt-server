'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SetRealizedPartyDto = void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongoose_1 = require('mongoose');
class SetRealizedPartyDto {}
exports.SetRealizedPartyDto = SetRealizedPartyDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    SetRealizedPartyDto.prototype,
    'variantId',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)(),
        tslib_1.__metadata('design:type', Number),
    ],
    SetRealizedPartyDto.prototype,
    'realizedParty',
    void 0
);
//# sourceMappingURL=stock.dto.js.map
