'use strict';
var LoggingHooks_1;
Object.defineProperty(exports, '__esModule', { value: true });
exports.LoggingHooks = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const log_service_1 = require('../services/log.service');
const mongoose_1 = tslib_1.__importDefault(require('mongoose'));
let LoggingHooks = (LoggingHooks_1 = class LoggingHooks {
    constructor(logService) {
        this.logService = logService;
        this.logger = new common_1.Logger(LoggingHooks_1.name);
    }
    onModuleInit() {
        console.log(mongoose_1.default.modelNames());
        mongoose_1.default.plugin((schema) => {
            console.log(2);
            const logger = this.logger;
            const createLog = async (operation, model, docId, oldData, newData) => {
                const collectionName = model.collection.name;
                await this.logService.add(operation, collectionName, docId, oldData, newData);
            };
            schema.post('save', async (doc) => {
                console.log(3);
                await createLog('CREATE', doc.constructor, doc._id, null, doc.toObject());
            });
            schema.post('insertMany', async function (docs) {
                if (Array.isArray(docs)) {
                    for (const doc of docs) {
                        await createLog('CREATE', doc.constructor, doc._id, null, doc.toObject());
                    }
                }
            });
            schema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
                try {
                    const documentId = this.getQuery()._id;
                    if (documentId) {
                        const oldDoc = await this.model.findById(documentId);
                        this._oldDoc = oldDoc ? oldDoc.toObject() : null;
                    }
                } catch (error) {
                    logger.error('Error preparing UPDATE hook', error);
                }
                next();
            });
            schema.post(['updateOne', 'findOneAndUpdate'], async function (doc) {
                try {
                    const documentId = this.getQuery()._id;
                    const newDoc = await this.model.findById(documentId);
                    if (newDoc) {
                        await createLog(
                            'UPDATE',
                            doc.constructor,
                            documentId,
                            this._oldDoc,
                            newDoc.toObject()
                        );
                    }
                } catch (error) {
                    logger.error('Error logging UPDATE operation', error);
                }
            });
            schema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
                try {
                    const documentId = this.getQuery()._id;
                    if (documentId) {
                        const oldDoc = await this.model.findById(documentId);
                        this._oldDoc = oldDoc ? oldDoc.toObject() : null;
                    }
                } catch (error) {
                    logger.error('Error preparing DELETE hook', error);
                }
                next();
            });
            schema.post(['deleteOne', 'findOneAndDelete'], async function (doc) {
                try {
                    if (this._oldDoc) {
                        await createLog(
                            'DELETE',
                            doc.constructor,
                            this._oldDoc._id,
                            this._oldDoc,
                            null
                        );
                    }
                } catch (error) {
                    logger.error('Error logging DELETE operation', error);
                }
            });
        });
    }
});
exports.LoggingHooks = LoggingHooks;
exports.LoggingHooks =
    LoggingHooks =
    LoggingHooks_1 =
        tslib_1.__decorate(
            [
                (0, common_1.Injectable)(),
                tslib_1.__metadata('design:paramtypes', [log_service_1.LogService]),
            ],
            LoggingHooks
        );
//# sourceMappingURL=logging.hook.js.map
