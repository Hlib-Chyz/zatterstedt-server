import { CreateVariantType } from '@strategies/variant.types';
import { Model, Types } from 'mongoose';
import { SuccessDto } from 'src/dto/shared.dto';
import { VariantDocument } from 'src/schemas/variant.schema';
import { ErrorService } from './error.service';
export declare class VariantService {
    private variantModel;
    private readonly errorService;
    constructor(variantModel: Model<VariantDocument>, errorService: ErrorService);
    getAllByProductId(productId: Types.ObjectId): Promise<VariantDocument[]>;
    getById(id: Types.ObjectId): Promise<VariantDocument>;
    getAll(): Promise<VariantDocument[]>;
    deleteManyByProductId(productId: Types.ObjectId): Promise<SuccessDto>;
    getProductId(variantId: Types.ObjectId): Promise<Types.ObjectId>;
    add(variant: CreateVariantType): Promise<Types.ObjectId>;
}
