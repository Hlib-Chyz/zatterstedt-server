import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, LoginResponseDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { UserDocument } from 'src/schemas/user.schema';
import { ErrorService } from './error.service';
import { UserService } from './user.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
    public constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private errorService: ErrorService,
        private mailerService: MailerService,
        private configService: ConfigService
    ) {}

    public async login(loginInfo: LoginDto): Promise<LoginResponseDto> {
        try {
            const user = await this.userService.findByEmail(loginInfo.email);
            if (!user || loginInfo.password !== user.password) {
                throw new NotFoundException('Invalid credentials');
            }
            const token = await this.generateJwtToken(user);
            return plainToInstance(
                LoginResponseDto,
                { success: true, token },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to login');
            return plainToInstance(
                LoginResponseDto,
                { success: false, token: '' },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async verifyCode(verifyCodeInfo: VerifyCodeDto): Promise<LoginResponseDto> {
        try {
            const user = await this.userService.findByEmail(verifyCodeInfo.email);
            if (user?.emailVerificationCode !== verifyCodeInfo.code) {
                throw new NotFoundException('Invalid verification code');
            }
            const token = await this.generateJwtToken(user);
            return plainToInstance(
                LoginResponseDto,
                { success: true, token },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to verify code');
            return plainToInstance(
                LoginResponseDto,
                { success: false, token: '' },
                { excludeExtraneousValues: true }
            );
        }
    }

    public generateVerificationCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    public async sendVerificationEmail(email: string, code: string): Promise<void> {
        await this.mailerService.sendMail({
            from: this.configService.get<string>('MAIL') ?? '',
            to: email,
            subject: 'Welcome!',
            text: `Your verification code is: ${code}`,
        });
    }

    private async generateJwtToken(user: UserDocument): Promise<string> {
        return this.jwtService.sign({ email: user.email, sub: user._id }, { expiresIn: '7d' });
    }
}
