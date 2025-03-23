'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.log = log;
const log_schema_1 = require('../schemas/log.schema');
async function saveLog(doc, logData) {
    const LogModel = doc.model(log_schema_1.Log.name);
    const log = new LogModel(logData);
    await log.save();
}
function logCreate(schema, collectionName) {
    schema.post('save', async function (doc) {
        await saveLog(doc, {
            operation: 'create',
            collection: collectionName,
            documentId: doc._id,
            oldData: null,
            newData: doc.toObject(),
        });
    });
}
function logUpdate(schema, collectionName) {
    schema.pre('findOneAndUpdate', async function (next) {
        this._oldData = await this.model
            .findOne(this.getFilter())
            .session(this.getOptions().session ?? null)
            .lean();
        next();
    });
    schema.post('findOneAndUpdate', async function (doc) {
        if (!doc) {
            return;
        }
        const newData = await this.model
            .findById(doc._id)
            .session(this.getOptions().session ?? null)
            .lean();
        await saveLog(doc, {
            operation: 'update',
            collection: collectionName,
            documentId: doc._id,
            oldData: this._oldData,
            newData,
        });
    });
}
function logDelete(schema, collectionName) {
    schema.pre(['findOneAndDelete', 'deleteMany'], async function (next) {
        this._deletedDocs = await this.model.find(this.getFilter());
        next();
    });
    schema.post(['findOneAndDelete', 'deleteMany'], async function () {
        const deletedDocs = this._deletedDocs || [];
        await Promise.all(
            deletedDocs.map((deletedDoc) => {
                saveLog(deletedDoc, {
                    operation: 'delete',
                    collection: collectionName,
                    documentId: deletedDoc._id,
                    oldData: deletedDoc,
                    newData: null,
                });
            })
        );
    });
}
function log(schema, collectionName) {
    logCreate(schema, collectionName);
    logUpdate(schema, collectionName);
    logDelete(schema, collectionName);
}
//# sourceMappingURL=log.helper.js.map
