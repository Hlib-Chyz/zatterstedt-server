"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
class UserDto {
}
exports.UserDto = UserDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], UserDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], UserDto.prototype, "emailVerificationCode", void 0);
//# sourceMappingURL=user.dto.js.map