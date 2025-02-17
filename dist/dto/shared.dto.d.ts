import { PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';
export declare class DeleteGetDto {
    id: ObjectId;
}
export declare class SuccessDto {
    success: boolean;
}
export declare class ParseObjectIdPipe implements PipeTransform {
    transform(value: string): ObjectId;
}
