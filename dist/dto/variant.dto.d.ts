import { ObjectId } from 'mongodb';
export declare class VariantDto {
    _id: ObjectId;
    color: string;
    size: string;
    productId: string;
}
export declare class CreateVariantDto {
    color: string;
    size: string;
    productId: string;
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
export declare class CreateVariantsDto {
    productId: string;
    variants: VariantUpdateDto[];
    oldVariantIds: string[];
}
export declare class CanSaveVariantsDto {
    variantIds: string[];
}
export declare class CanSaveVariantsResponseDto {
    canSaveVariants: boolean;
}
export {};
