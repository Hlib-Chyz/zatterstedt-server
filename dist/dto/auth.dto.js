'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VerifyCodeDto = exports.LoginResponseDto = exports.LoginDto = void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
class LoginDto {}
exports.LoginDto = LoginDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    LoginDto.prototype,
    'email',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    LoginDto.prototype,
    'password',
    void 0
);
class LoginResponseDto {}
exports.LoginResponseDto = LoginResponseDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Boolean),
    ],
    LoginResponseDto.prototype,
    'success',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    LoginResponseDto.prototype,
    'token',
    void 0
);
class VerifyCodeDto {}
exports.VerifyCodeDto = VerifyCodeDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    VerifyCodeDto.prototype,
    'email',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    VerifyCodeDto.prototype,
    'code',
    void 0
);
//# sourceMappingURL=auth.dto.js.map
