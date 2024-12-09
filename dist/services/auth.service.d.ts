import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { ErrorService } from './error.service';
import { UserService } from './user.service';
import { Response } from 'express';
import { LoginDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { SuccessDto } from '@dto/shared.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    private errorService;
    private mailerService;
    private configService;
    constructor(userService: UserService, jwtService: JwtService, errorService: ErrorService, mailerService: MailerService, configService: ConfigService);
    login(loginInfo: LoginDto): Promise<SuccessDto>;
    verifyCode(verifyCodeInfo: VerifyCodeDto, res: Response): Promise<SuccessDto>;
    private generateVerificationCode;
    private sendVerificationEmail;
    private generateJwtToken;
}
