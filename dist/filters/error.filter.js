"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();
        response.status(status).json({
            statusCode: status,
            message: exception.getResponse()?.message ??
                'Something went wrong',
            timestamp: new Date().toISOString(),
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = tslib_1.__decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
//# sourceMappingURL=error.filter.js.map