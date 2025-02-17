import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResponseDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { ErrorService } from './error.service';
import { UserService } from './user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private errorService;
    private mailerService;
    private configService;
    constructor(userService: UserService, jwtService: JwtService, errorService: ErrorService, mailerService: MailerService, configService: ConfigService);
    login(loginInfo: LoginDto): Promise<LoginResponseDto>;
    verifyCode(verifyCodeInfo: VerifyCodeDto): Promise<LoginResponseDto>;
    generateVerificationCode(): string;
    sendVerificationEmail(email: string, code: string): Promise<void>;
    private generateJwtToken;
}
