import { SuccessDto } from '@dto/shared.dto';
import { LoginDto, VerifyCodeDto } from 'src/dto/auth.dto';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(loginInfo: LoginDto): Promise<SuccessDto>;
    add(loginInfo: LoginDto): Promise<SuccessDto>;
    verifyCode(verifyCodeInfo: VerifyCodeDto): Promise<SuccessDto>;
}
