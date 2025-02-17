"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const log_schema_1 = require("../schemas/log.schema");
const mongoose_2 = require("mongoose");
let LogService = class LogService {
    constructor(logModel) {
        this.logModel = logModel;
    }
    async add(operation, collection, documentId, oldData, newData) {
        const log = new this.logModel({ operation, collection, documentId, oldData, newData });
        await log.save();
    }
};
exports.LogService = LogService;
exports.LogService = LogService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(log_schema_1.Log.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model])
], LogService);
//# sourceMappingURL=log.service.js.map