import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorService } from './error.service';
import { UserService } from './user.service';
import { User } from 'src/entities/user.entity';
import { Response } from 'express';
import { LoginDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    public constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private errorService: ErrorService,
        private mailerService: MailerService,
        private configService: ConfigService
    ) {}

    public async login(loginInfo: LoginDto): Promise<{ message: string }> {
        try {
            const user = await this.userService.findByEmail(loginInfo.email);
            if (!user || loginInfo.password !== user.password) {
                throw new NotFoundException('Invalid credentials');
            }

            const verificationCode = this.generateVerificationCode();
            await this.userService.updateVerificationCode(user.email, verificationCode);

            await this.sendVerificationEmail(loginInfo.email, verificationCode);

            return { message: 'Verification code sent to email' };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to login');
            return { message: 'Failed to login' };
        }
    }

    public async verifyCode(
        verifyCodeInfo: VerifyCodeDto,
        res: Response
    ): Promise<{ message: string }> {
        try {
            const user = await this.userService.findByEmail(verifyCodeInfo.email);
            if (user?.emailVerificationCode === verifyCodeInfo.code) {
                const token = await this.generateJwtToken(user);
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 86400000,
                });
                return { message: 'Logged in successfully' };
            } else {
                throw new NotFoundException('Invalid verification code');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to verify code');
            return { message: 'Failed to verify code' };
        }
    }

    private generateVerificationCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    private async sendVerificationEmail(email: string, code: string): Promise<void> {
        await this.mailerService.sendMail({
            from: this.configService.get<string>('MAIL')!,
            to: email,
            subject: 'Welcome!',
            text: `Your verification code is: ${code}`,
        });
    }

    private async generateJwtToken(user: User): Promise<string> {
        return this.jwtService.sign({ email: user.email, sub: user._id });
    }
}
