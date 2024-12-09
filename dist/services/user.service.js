"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const error_service_1 = require("./error.service");
let UserService = class UserService {
    constructor(userRepository, errorService) {
        this.userRepository = userRepository;
        this.errorService = errorService;
    }
    async findByEmail(email) {
        try {
            return this.userRepository.findOne({ where: { email } });
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to login');
            return null;
        }
    }
    async updateVerificationCode(email, code) {
        try {
            await this.userRepository.update({ email }, { emailVerificationCode: code });
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to login');
        }
    }
    async createUser(loginInfo) {
        try {
            const newUser = this.userRepository.create(loginInfo);
            await this.userRepository.save(newUser);
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to login');
            return { success: false };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        error_service_1.ErrorService])
], UserService);
//# sourceMappingURL=user.service.js.map