import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    public email: string;
    @IsString()
    @IsNotEmpty()
    public password: string;
}

export class LoginResponseDto {
    @IsBoolean()
    @IsNotEmpty()
    public success: boolean;
    @IsString()
    @IsNotEmpty()
    public token: string;
}

export class VerifyCodeDto {
    @IsString()
    @IsNotEmpty()
    public email: string;
    @IsString()
    @IsNotEmpty()
    public code: string;
}
