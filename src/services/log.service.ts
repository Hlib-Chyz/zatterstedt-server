import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from '@schemas/log.schema';
import { ErrorService } from '@services/error.service';
import { Model, Types } from 'mongoose';

@Injectable()
export class LogService {
    public constructor(
        @InjectModel(Log.name) private readonly logModel: Model<LogDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async add(
        operation: 'CREATE' | 'UPDATE' | 'DELETE',
        collection: string,
        documentId: Types.ObjectId,
        oldData: Record<string, unknown> | null = null,
        newData: Record<string, unknown> | null = null
    ): Promise<void> {
        try {
            const log = new this.logModel({ operation, collection, documentId, oldData, newData });
            await log.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add log');
        }
    }
}
