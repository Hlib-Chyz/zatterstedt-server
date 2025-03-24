import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto, LoginResponseDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class AuthController {
    public constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    @Post('login')
    public async login(@Body() loginInfo: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(loginInfo);
    }

    @Post('add')
    public async add(@Body() loginInfo: LoginDto, @Res() res: Response): Promise<void> {
        await this.userService.add(loginInfo);
        res.status(204).send();
    }

    @Post('verify-code')
    public async verifyCode(@Body() verifyCodeInfo: VerifyCodeDto): Promise<LoginResponseDto> {
        return this.authService.verifyCode(verifyCodeInfo);
    }
}
