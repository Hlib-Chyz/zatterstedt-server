import { Types } from 'mongoose';
export declare class CreateFixedCostDto {
    name: string;
    cost: number;
}
export declare class UpdateFixedCostDto {
    _id: Types.ObjectId;
    name: string;
    cost: number;
}
export declare class FixedCostDto {
    _id: Types.ObjectId;
    name: string;
    cost: number;
}
