import { Types } from 'mongoose';
export declare class UpdateAdditionalCostDto {
    _id: Types.ObjectId;
    cost: number;
}
export declare class CreateAdditionalCostDto {
    productId: Types.ObjectId;
}
