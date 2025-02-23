import { PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
export declare class DeleteGetDto {
    id: Types.ObjectId;
}
export declare class SuccessDto {
    success: boolean;
}
export declare class ParseObjectIdPipe implements PipeTransform {
    transform(value: string): Types.ObjectId;
}
