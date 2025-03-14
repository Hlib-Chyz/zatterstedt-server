/* eslint-disable @typescript-eslint/no-explicit-any */
import { Log } from '@schemas/log.schema';
import { Document, Schema, Types } from 'mongoose';

async function saveLog(doc: Document, logData: Omit<Log, 'createdAt'>): Promise<void> {
    const LogModel = doc.model(Log.name);
    const log = new LogModel(logData);
    await log.save();
}

function logCreate(schema: Schema, collectionName: string): void {
    schema.post('save', async function (doc: Document) {
        await saveLog(doc, {
            operation: 'create',
            collection: collectionName,
            documentId: doc._id as Types.ObjectId,
            oldData: null,
            newData: doc.toObject(),
        });
    });
}

function logUpdate(schema: Schema, collectionName: string): void {
    schema.pre('findOneAndUpdate', async function (next) {
        (this as any)._oldData = await this.model.findOne(this.getFilter()).lean();
        next();
    });
    schema.post('findOneAndUpdate', async function (doc: Document) {
        if (!doc) {
            return;
        }
        await saveLog(doc, {
            operation: 'update',
            collection: collectionName,
            documentId: doc._id as Types.ObjectId,
            oldData: (this as any)._oldData,
            newData: doc.toObject(),
        });
    });
}

function logDelete(schema: Schema, collectionName: string): void {
    schema.pre(['findOneAndDelete', 'deleteMany'], async function (next) {
        (this as any)._deletedDocs = await this.model.find(this.getFilter()).lean();
        next();
    });
    schema.post(['findOneAndDelete', 'deleteMany'], async function (doc: Document) {
        const deletedDocs = (this as any)._deletedDocs || [];
        await Promise.all(
            deletedDocs.map((deletedDoc: any) =>
                saveLog(doc, {
                    operation: 'delete',
                    collection: collectionName,
                    documentId: deletedDoc._id,
                    oldData: deletedDoc,
                    newData: null,
                })
            )
        );
    });
}

export function log(schema: Schema, collectionName: string): void {
    logCreate(schema, collectionName);
    logUpdate(schema, collectionName);
    logDelete(schema, collectionName);
}
