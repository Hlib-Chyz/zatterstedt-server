import { ObjectId } from 'mongodb';
export declare class UserDto {
    _id: ObjectId;
    email: string;
    password: string;
    emailVerificationCode: string | null;
}
