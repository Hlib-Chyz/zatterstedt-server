'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ParseObjectIdPipe = exports.SuccessDto = exports.DeleteGetDto = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongoose_1 = require('mongoose');
class DeleteGetDto {}
exports.DeleteGetDto = DeleteGetDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    DeleteGetDto.prototype,
    'id',
    void 0
);
class SuccessDto {}
exports.SuccessDto = SuccessDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsBoolean)(),
        tslib_1.__metadata('design:type', Boolean),
    ],
    SuccessDto.prototype,
    'success',
    void 0
);
class ParseObjectIdPipe {
    transform(value) {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException(`${value} is not a valid MongoDB ObjectId`);
        }
        return new mongoose_1.Types.ObjectId(value);
    }
}
exports.ParseObjectIdPipe = ParseObjectIdPipe;
//# sourceMappingURL=shared.dto.js.map
