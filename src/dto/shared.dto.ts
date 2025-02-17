import { BadRequestException, PipeTransform } from '@nestjs/common';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export class DeleteGetDto {
    @IsNotEmpty()
    public id: ObjectId;
}

export class SuccessDto {
    @IsNotEmpty()
    @IsBoolean()
    public success: boolean;
}

export class ParseObjectIdPipe implements PipeTransform {
    public transform(value: string): ObjectId {
        if (!ObjectId.isValid(value)) {
            throw new BadRequestException(`${value} is not a valid MongoDB ObjectId`);
        }
        return new Types.ObjectId(value);
    }
}
