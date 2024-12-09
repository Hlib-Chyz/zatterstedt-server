import { ObjectId } from 'mongodb';
export declare class UpdateAdditionalCostDto {
    _id: ObjectId;
    cost: number;
}
export declare class CreateAdditionalCostDto {
    productId: string;
}
