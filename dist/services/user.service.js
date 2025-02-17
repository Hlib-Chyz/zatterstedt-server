"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../schemas/user.schema");
const error_service_1 = require("./error.service");
let UserService = class UserService {
    constructor(userModel, errorService) {
        this.userModel = userModel;
        this.errorService = errorService;
    }
    async findByEmail(email) {
        try {
            return this.userModel.findOne({ email }).exec();
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to find user by email');
            return null;
        }
    }
    async updateVerificationCode(email, code) {
        try {
            const result = await this.userModel
                .updateOne({ email }, { emailVerificationCode: code })
                .exec();
            if (!result) {
                throw new common_1.NotFoundException('User not found');
            }
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to update verification code');
        }
    }
    async add(loginInfo) {
        try {
            const newUser = new this.userModel(loginInfo);
            await newUser.save();
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to create user');
            return { success: false };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model,
        error_service_1.ErrorService])
], UserService);
//# sourceMappingURL=user.service.js.map