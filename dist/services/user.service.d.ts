import { LoginDto } from 'src/dto/auth.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
export declare class UserService {
    private userRepository;
    private errorService;
    constructor(userRepository: Repository<User>, errorService: ErrorService);
    findByEmail(email: string): Promise<User | null>;
    updateVerificationCode(email: string, code: string): Promise<void>;
    createUser(loginInfo: LoginDto): Promise<SuccessDto>;
}
