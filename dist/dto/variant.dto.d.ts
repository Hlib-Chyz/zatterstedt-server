import { Types } from 'mongoose';
export declare class VariantLockupDto {
    _id: Types.ObjectId;
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
