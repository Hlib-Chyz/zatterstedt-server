import { Types } from 'mongoose';
export type CreateVariantType = {
    color: string;
    size: string;
    productId: Types.ObjectId;
};
