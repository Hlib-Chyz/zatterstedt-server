import { Response } from 'express';
import { LoginDto, LoginResponseDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(loginInfo: LoginDto): Promise<LoginResponseDto>;
    add(loginInfo: LoginDto, res: Response): Promise<void>;
    verifyCode(verifyCodeInfo: VerifyCodeDto): Promise<LoginResponseDto>;
}
