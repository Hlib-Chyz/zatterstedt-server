"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseObjectIdPipe = exports.SuccessDto = exports.DeleteGetDto = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
class DeleteGetDto {
}
exports.DeleteGetDto = DeleteGetDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], DeleteGetDto.prototype, "_id", void 0);
class SuccessDto {
}
exports.SuccessDto = SuccessDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], SuccessDto.prototype, "success", void 0);
class ParseObjectIdPipe {
    transform(value) {
        if (!mongodb_1.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException(`${value} is not a valid MongoDB ObjectId`);
        }
        return new mongodb_1.ObjectId(value);
    }
}
exports.ParseObjectIdPipe = ParseObjectIdPipe;
//# sourceMappingURL=shared.dto.js.map