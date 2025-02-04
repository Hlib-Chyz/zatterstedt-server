import { ObjectId } from 'mongodb';
export declare class Log {
    _id: ObjectId;
    operation: string;
    collection: string;
    documentId: string;
    oldData?: any;
    newData?: any;
    createdAt: Date;
}
