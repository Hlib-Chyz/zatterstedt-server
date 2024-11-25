import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';
import { LoginDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { SuccessDto } from '@dto/shared.dto';

@Controller('auth')
export class AuthController {
    public constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    @Post('login')
    public async login(@Body() loginInfo: LoginDto): Promise<SuccessDto> {
        return this.authService.login(loginInfo);
    }

    @Post('add')
    public async add(@Body() loginInfo: LoginDto): Promise<SuccessDto> {
        return this.userService.createUser(loginInfo);
    }

    @Post('verify-code')
    public async verifyCode(
        @Body() verifyCodeInfo: VerifyCodeDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<SuccessDto> {
        return this.authService.verifyCode(verifyCodeInfo, res);
    }
}
