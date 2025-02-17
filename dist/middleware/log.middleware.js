"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMiddleware = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const log_service_1 = require("../services/log.service");
const mongoose_1 = require("mongoose");
let LogMiddleware = class LogMiddleware {
    constructor(logService) {
        this.logService = logService;
    }
    async use(req, res, next) {
        const method = req.method.toLowerCase();
        let oldData = null;
        if (method === 'put' || method === 'delete') {
            const collection = req.baseUrl.split('/').pop();
            const documentId = req.params['id'];
            const model = req.app.get(`${collection}Model`);
            oldData = await model.findById(documentId).lean();
        }
        res.on('finish', async () => {
            if (['post', 'put', 'delete'].includes(method)) {
                const collection = req.baseUrl.split('/').pop() || '';
                const documentId = req.params['id']
                    ? new mongoose_1.Types.ObjectId(req.params['id'])
                    : new mongoose_1.Types.ObjectId();
                const operation = method === 'post' ? 'create' : method === 'put' ? 'update' : 'delete';
                const newData = method !== 'delete' ? req.body : null;
                await this.logService.add(operation, collection, documentId, oldData, newData);
            }
        });
        next();
    }
};
exports.LogMiddleware = LogMiddleware;
exports.LogMiddleware = LogMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [log_service_1.LogService])
], LogMiddleware);
//# sourceMappingURL=log.middleware.js.map