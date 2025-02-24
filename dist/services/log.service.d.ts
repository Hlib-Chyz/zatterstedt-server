import { LogDocument } from '@schemas/log.schema';
import { ErrorService } from '@services/error.service';
import { Model, Types } from 'mongoose';
export declare class LogService {
    private readonly logModel;
    private readonly errorService;
    constructor(logModel: Model<LogDocument>, errorService: ErrorService);
    add(
        operation: 'CREATE' | 'UPDATE' | 'DELETE',
        collection: string,
        documentId: Types.ObjectId,
        oldData?: Record<string, unknown> | null,
        newData?: Record<string, unknown> | null
    ): Promise<void>;
}
