"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let ErrorService = class ErrorService {
    throwError(error, additionalText) {
        const response = error?.getResponse?.();
        if (response) {
            response.message = additionalText + ': ' + response.message;
        }
        throw error;
    }
};
exports.ErrorService = ErrorService;
exports.ErrorService = ErrorService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ErrorService);
//# sourceMappingURL=error.service.js.map