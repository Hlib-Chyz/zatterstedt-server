import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { LoginDto } from 'src/dto/auth.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { ErrorService } from './error.service';

@Injectable()
export class UserService {
    public constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private errorService: ErrorService
    ) {}

    public async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            return this.userModel.findOne({ email }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to find user by email');
            return null;
        }
    }

    public async updateVerificationCode(email: string, code: string): Promise<void> {
        try {
            const result = await this.userModel
                .updateOne({ email }, { emailVerificationCode: code })
                .exec();
            if (!result) {
                throw new NotFoundException('User not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update verification code');
        }
    }

    public async add(loginInfo: LoginDto): Promise<SuccessDto> {
        try {
            const newUser = new this.userModel(loginInfo);
            await newUser.save();
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create user');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }
}
