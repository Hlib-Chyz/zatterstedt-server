import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/dto/auth.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private errorService: ErrorService
    ) {}

    public async findByEmail(email: string): Promise<User | null> {
        try {
            return this.userRepository.findOne({ where: { email } });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to login');
            return null;
        }
    }

    public async updateVerificationCode(email: string, code: string): Promise<void> {
        try {
            await this.userRepository.update({ email }, { emailVerificationCode: code });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to login');
        }
    }

    public async createUser(loginInfo: LoginDto): Promise<SuccessDto> {
        try {
            const newUser = this.userRepository.create(loginInfo);
            await this.userRepository.save(newUser);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to login');
            return { success: false };
        }
    }
}
