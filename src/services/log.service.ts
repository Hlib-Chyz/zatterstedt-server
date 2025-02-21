import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from '@schemas/log.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class LogService {
    public constructor(@InjectModel(Log.name) private readonly logModel: Model<LogDocument>) {}

    public async add(
        operation: string,
        collection: string,
        documentId: Types.ObjectId,
        oldData: Record<string, unknown> | null,
        newData: Record<string, unknown> | null
    ): Promise<void> {
        const log = new this.logModel({ operation, collection, documentId, oldData, newData });
        await log.save();
    }
}
