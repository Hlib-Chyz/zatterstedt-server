import { CreateVariantType } from '@strategies/variant.types';
import { ClientSession, Model, Types } from 'mongoose';
import { VariantDocument } from 'src/schemas/variant.schema';
import { ErrorService } from './error.service';
export declare class VariantService {
    private variantModel;
    private readonly errorService;
    constructor(variantModel: Model<VariantDocument>, errorService: ErrorService);
    getAllByProductId(productId: Types.ObjectId): Promise<VariantDocument[]>;
    getById(id: Types.ObjectId): Promise<VariantDocument>;
    getAll(): Promise<VariantDocument[]>;
    deleteManyByProductId(productId: Types.ObjectId, session: ClientSession): Promise<void>;
    getProductId(variantId: Types.ObjectId): Promise<Types.ObjectId>;
    add(variant: CreateVariantType, session: ClientSession): Promise<Types.ObjectId>;
}
