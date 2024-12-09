import { AuthService } from 'src/services/auth.service';
import { Response } from 'express';
import { UserService } from 'src/services/user.service';
import { LoginDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { SuccessDto } from '@dto/shared.dto';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(loginInfo: LoginDto): Promise<SuccessDto>;
    add(loginInfo: LoginDto): Promise<SuccessDto>;
    verifyCode(verifyCodeInfo: VerifyCodeDto, res: Response): Promise<SuccessDto>;
}
