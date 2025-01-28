'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const tslib_1 = require('tslib');
const mailer_1 = require('@nestjs-modules/mailer');
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const jwt_1 = require('@nestjs/jwt');
const error_service_1 = require('./error.service');
const user_service_1 = require('./user.service');
let AuthService = class AuthService {
    constructor(userService, jwtService, errorService, mailerService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.errorService = errorService;
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async login(loginInfo) {
        try {
            const user = await this.userService.findByEmail(loginInfo.email);
            if (!user || loginInfo.password !== user.password) {
                throw new common_1.NotFoundException('Invalid credentials');
            }
            const token = await this.generateJwtToken(user);
            return { success: true, token };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to login');
            return { success: false, token: '' };
        }
    }
    async verifyCode(verifyCodeInfo) {
        try {
            const user = await this.userService.findByEmail(verifyCodeInfo.email);
            if (user?.emailVerificationCode === verifyCodeInfo.code) {
                const token = await this.generateJwtToken(user);
                return { success: true, token };
            } else {
                throw new common_1.NotFoundException('Invalid verification code');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to verify code');
            return { success: false, token: '' };
        }
    }
    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async sendVerificationEmail(email, code) {
        await this.mailerService.sendMail({
            from: this.configService.get('MAIL') ?? '',
            to: email,
            subject: 'Welcome!',
            text: `Your verification code is: ${code}`,
        });
    }
    async generateJwtToken(user) {
        return this.jwtService.sign({ email: user.email, sub: user._id }, { expiresIn: '7d' });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__metadata('design:paramtypes', [
            user_service_1.UserService,
            jwt_1.JwtService,
            error_service_1.ErrorService,
            mailer_1.MailerService,
            config_1.ConfigService,
        ]),
    ],
    AuthService
);
//# sourceMappingURL=auth.service.js.map
