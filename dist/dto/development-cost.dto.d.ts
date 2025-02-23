import { Types } from 'mongoose';
export declare class CreateDevelopmentCostDto {
    date: string;
    description: string;
    cost: number;
    productId: Types.ObjectId;
}
export declare class UpdateDevelopmentCostDto {
    _id: Types.ObjectId;
    date: string;
    description: string;
    cost: number;
}
