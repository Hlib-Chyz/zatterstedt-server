import { Log } from '@schemas/log.schema';
import { Model, Types } from 'mongoose';
export declare class LogService {
    private readonly logModel;
    constructor(logModel: Model<Log>);
    add(operation: string, collection: string, documentId: Types.ObjectId, oldData: Record<string, unknown> | null, newData: Record<string, unknown> | null): Promise<void>;
}
