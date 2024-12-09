"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([(req) => req.cookies['jwt']]),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
        this.configService = configService;
    }
    async validate() {
        return {};
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map