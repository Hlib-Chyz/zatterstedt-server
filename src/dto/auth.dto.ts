import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public email: string;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public password: string;
}

export class LoginResponseDto {
    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    public success: boolean;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public token: string;
}

export class VerifyCodeDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public email: string;
    @Expose()
    @IsString()
    @IsNotEmpty()
    public code: string;
}
