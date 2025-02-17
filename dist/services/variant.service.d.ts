import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { SuccessDto } from 'src/dto/shared.dto';
import { CreateVariantDto } from 'src/dto/variant.dto';
import { Variant, VariantDocument } from 'src/schemas/variant.schema';
import { ErrorService } from './error.service';
export declare class VariantService {
    private variantModel;
    private readonly errorService;
    constructor(variantModel: Model<Variant>, errorService: ErrorService);
    getAllByProductId(productId: ObjectId): Promise<VariantDocument[]>;
    getById(id: ObjectId): Promise<Variant>;
    getAll(): Promise<VariantDocument[]>;
    deleteManyByProductId(productId: ObjectId): Promise<SuccessDto>;
    getProductId(variantId: ObjectId): Promise<ObjectId>;
    add(variant: CreateVariantDto): Promise<ObjectId>;
}
