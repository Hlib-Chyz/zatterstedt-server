import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UserDto {
    @IsNotEmpty()
    public _id: Types.ObjectId;
    @IsNotEmpty()
    @IsString()
    public email: string;
    @IsNotEmpty()
    @IsString()
    public password: string;
    @IsString()
    public emailVerificationCode: string | null;
}
