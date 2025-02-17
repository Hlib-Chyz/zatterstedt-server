import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
export declare class CreateDevelopmentCostDto {
    date: string;
    description: string;
    cost: number;
    productId: string;
}
export declare class UpdateDevelopmentCostDto {
    _id: Types.ObjectId;
    date: string;
    description: string;
    cost: number;
}
export declare class DevelopmentCostDto {
    _id: ObjectId;
    date: string;
    description: string;
    cost: number;
    productId: string;
}
