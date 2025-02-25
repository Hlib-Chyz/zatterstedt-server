import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

export class ParseObjectIdPipe implements PipeTransform {
    public transform(value: string): Types.ObjectId {
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException(`${value} is not a valid MongoDB ObjectId`);
        }
        return new Types.ObjectId(value);
    }
}
