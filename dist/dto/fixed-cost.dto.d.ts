import { ObjectId } from 'mongodb';
export declare class CreateFixedCostDto {
    name: string;
    cost: number;
}
export declare class UpdateFixedCostDto {
    _id: ObjectId;
    name: string;
    cost: number;
}
export declare class FixedCostDto {
    _id: ObjectId;
    name: string;
    cost: number;
}
