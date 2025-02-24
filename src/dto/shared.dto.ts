import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteGetDto {
    @Expose()
    @IsNotEmpty()
    @Type(() => String)
    public id: Types.ObjectId;
}

export class SuccessDto {
    @Expose()
    @IsNotEmpty()
    @IsBoolean()
    public success: boolean;
}

export class ParseObjectIdPipe implements PipeTransform {
    public transform(value: string): Types.ObjectId {
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException(`${value} is not a valid MongoDB ObjectId`);
        }
        return new Types.ObjectId(value);
    }
}
