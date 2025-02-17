import { Model } from 'mongoose';
import { LoginDto } from 'src/dto/auth.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { ErrorService } from './error.service';
export declare class UserService {
    private userModel;
    private errorService;
    constructor(userModel: Model<User>, errorService: ErrorService);
    findByEmail(email: string): Promise<UserDocument | null>;
    updateVerificationCode(email: string, code: string): Promise<void>;
    add(loginInfo: LoginDto): Promise<SuccessDto>;
}
