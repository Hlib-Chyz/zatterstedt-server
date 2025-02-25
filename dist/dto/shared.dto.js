'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ParseObjectIdPipe = void 0;
const common_1 = require('@nestjs/common');
const mongoose_1 = require('mongoose');
class ParseObjectIdPipe {
    transform(value) {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException(`${value} is not a valid MongoDB ObjectId`);
        }
        return new mongoose_1.Types.ObjectId(value);
    }
}
exports.ParseObjectIdPipe = ParseObjectIdPipe;
//# sourceMappingURL=shared.dto.js.map
