import { Types } from 'mongoose';
export declare class UpdateOtherCostDto {
    _id: Types.ObjectId;
    date: string;
    name: string;
    cost: number;
}
export declare class CreateOtherCostDto {
    date: string;
    name: string;
    cost: number;
}
export declare class OtherCostDto {
    _id: Types.ObjectId;
    date: string;
    name: string;
    cost: number;
}
