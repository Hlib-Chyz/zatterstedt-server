/* eslint-disable @typescript-eslint/no-explicit-any */
// logging.hook.ts
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { LogService } from '@services/log.service';
import mongoose, { Types } from 'mongoose';

@Injectable()
export class LoggingHooks implements OnModuleInit {
    private readonly logger = new Logger(LoggingHooks.name);

    public constructor(private readonly logService: LogService) {}

    public onModuleInit(): void {
        mongoose.plugin((schema) => {
            const logger = this.logger;
            const createLog = async (
                operation: 'CREATE' | 'UPDATE' | 'DELETE',
                model: mongoose.Model<any>,
                docId: Types.ObjectId,
                oldData: Record<string, unknown> | null,
                newData: Record<string, unknown> | null
            ): Promise<void> => {
                const collectionName = model.collection.name;
                await this.logService.add(operation, collectionName, docId, oldData, newData);
            };

            schema.post('save', async (doc) => {
                await createLog(
                    'CREATE',
                    doc.constructor as mongoose.Model<any>,
                    doc._id as Types.ObjectId,
                    null,
                    doc.toObject()
                );
            });

            schema.post('insertMany', async function (docs: mongoose.Document[]) {
                if (Array.isArray(docs)) {
                    await Promise.all(
                        docs.map((doc) =>
                            createLog(
                                'CREATE',
                                doc.constructor as mongoose.Model<any>,
                                doc._id as Types.ObjectId,
                                null,
                                doc.toObject()
                            )
                        )
                    );
                }
            });

            schema.pre(['updateOne', 'findOneAndUpdate'], async function (next) {
                try {
                    const documentId = this.getQuery()._id;
                    if (documentId) {
                        const oldDoc = await this.model.findById(documentId);
                        (this as any)._oldDoc = oldDoc ? oldDoc.toObject() : null;
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
                            doc.constructor as mongoose.Model<any>,
                            documentId,
                            (this as any)._oldDoc,
                            newDoc.toObject()
                        );
                    }
                } catch (error) {
                    logger.error('Error logging UPDATE operation', error);
                }
            });

            // ✅ Логирование удаления (deleteOne, findOneAndDelete)
            schema.pre(['deleteOne', 'findOneAndDelete'], async function (next) {
                try {
                    const documentId = this.getQuery()._id;
                    if (documentId) {
                        const oldDoc = await this.model.findById(documentId);
                        (this as any)._oldDoc = oldDoc ? oldDoc.toObject() : null;
                    }
                } catch (error) {
                    logger.error('Error preparing DELETE hook', error);
                }
                next();
            });

            schema.post(['deleteOne', 'findOneAndDelete'], async function (doc) {
                try {
                    if ((this as any)._oldDoc) {
                        await createLog(
                            'DELETE',
                            doc.constructor as mongoose.Model<any>,
                            (this as any)._oldDoc._id,
                            (this as any)._oldDoc,
                            null
                        );
                    }
                } catch (error) {
                    logger.error('Error logging DELETE operation', error);
                }
            });
        });
    }
}
