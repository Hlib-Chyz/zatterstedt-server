import { ObjectId } from 'mongodb';
export declare class User {
    _id: ObjectId;
    email: string;
    password: string;
    emailVerificationCode: string;
}
