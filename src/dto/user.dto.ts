import { IsNotEmpty, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UserDto {
    @IsNotEmpty()
    public _id: ObjectId;
    @IsNotEmpty()
    @IsString()
    public email: string;
    @IsNotEmpty()
    @IsString()
    public password: string;
    @IsString()
    public emailVerificationCode: string | null;
}
