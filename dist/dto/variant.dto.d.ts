import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
export declare class VariantDto {
    _id: ObjectId;
    color: string;
    size: string;
    productId: string;
}
export declare class CreateVariantDto {
    color: string;
    size: string;
    productId: Types.ObjectId;
}
export declare class VariantLockupDto {
    _id: ObjectId;
    name: string;
}
declare class VariantUpdateDto {
    size: string;
    color: string;
    quantity: number;
}
export declare class UpdateVariantDto {
    productId: Types.ObjectId;
    variants: VariantUpdateDto[];
    oldVariantIds: Types.ObjectId[];
}
export declare class CanSaveVariantDto {
    variantIds: Types.ObjectId[];
}
export declare class CanSaveVariantResponseDto {
    canSaveVariant: boolean;
}
export {};
