'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthController = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const auth_dto_1 = require('../dto/auth.dto');
const auth_service_1 = require('../services/auth.service');
const user_service_1 = require('../services/user.service');
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(loginInfo) {
        return this.authService.login(loginInfo);
    }
    async add(loginInfo) {
        return this.userService.createUser(loginInfo);
    }
    async verifyCode(verifyCodeInfo) {
        return this.authService.verifyCode(verifyCodeInfo);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate(
    [
        (0, common_1.Post)('login'),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [auth_dto_1.LoginDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'login',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Post)('add'),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [auth_dto_1.LoginDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'add',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Post)('verify-code'),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [auth_dto_1.VerifyCodeDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    AuthController.prototype,
    'verifyCode',
    null
);
exports.AuthController = AuthController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('auth'),
        tslib_1.__metadata('design:paramtypes', [
            auth_service_1.AuthService,
            user_service_1.UserService,
        ]),
    ],
    AuthController
);
//# sourceMappingURL=auth.controller.js.map
