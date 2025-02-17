import { SuccessDto } from '@dto/shared.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

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
        return this.userService.add(loginInfo);
    }

    @Post('verify-code')
    public async verifyCode(@Body() verifyCodeInfo: VerifyCodeDto): Promise<SuccessDto> {
        return this.authService.verifyCode(verifyCodeInfo);
    }
}
