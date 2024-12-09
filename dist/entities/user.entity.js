"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mongodb_1 = require("mongodb");
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", mongodb_1.ObjectId)
], User.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "emailVerificationCode", void 0);
exports.User = User = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map