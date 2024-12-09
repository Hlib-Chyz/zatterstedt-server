import { ObjectId } from 'mongodb';
export declare class UpdateOtherCostDto {
    _id: ObjectId;
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
    _id: ObjectId;
    date: string;
    name: string;
    cost: number;
}
