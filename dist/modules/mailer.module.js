'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ZatterstedtMailerModule = void 0;
const tslib_1 = require('tslib');
const mailer_1 = require('@nestjs-modules/mailer');
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
let ZatterstedtMailerModule = class ZatterstedtMailerModule {};
exports.ZatterstedtMailerModule = ZatterstedtMailerModule;
exports.ZatterstedtMailerModule = ZatterstedtMailerModule = tslib_1.__decorate(
    [
        (0, common_1.Module)({
            imports: [
                mailer_1.MailerModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: {
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: configService.get('MAIL') ?? '',
                                pass: configService.get('MAIL_PASS') ?? '',
                            },
                        },
                    }),
                }),
            ],
        }),
    ],
    ZatterstedtMailerModule
);
//# sourceMappingURL=mailer.module.js.map
