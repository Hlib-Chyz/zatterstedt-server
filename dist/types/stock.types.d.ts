import { Types } from 'mongoose';
export type CreateStockType = {
    variantId: Types.ObjectId;
    total: number;
};
