import { HydratedDocument, Types } from 'mongoose';
export type LogDocument = HydratedDocument<Log>;
export declare class Log {
    operation: string;
    collection: string;
    documentId: Types.ObjectId;
    oldData: Record<string, unknown> | null;
    newData: Record<string, unknown> | null;
    createdAt: Date;
}
export declare const LogSchema: import("mongoose").Schema<Log, import("mongoose").Model<Log, any, any, any, import("mongoose").Document<unknown, any, Log> & Log & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Log, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Log>> & import("mongoose").FlatRecord<Log> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
