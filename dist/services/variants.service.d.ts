import { ObjectId } from 'mongodb';
import { SuccessDto } from 'src/dto/shared.dto';
import { CreateVariantDto, VariantDto } from 'src/dto/variant.dto';
import { Variant } from 'src/entities/variant.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
export declare class VariantsService {
    private variantsRepository;
    private readonly errorService;
    constructor(variantsRepository: Repository<Variant>, errorService: ErrorService);
    getByProductId(productId: string): Promise<VariantDto[]>;
    getVariant(_id: ObjectId): Promise<Variant>;
    getAll(): Promise<VariantDto[]>;
    deleteVariantsByProductId(productId: string): Promise<SuccessDto>;
    getProductId(variantId: string): Promise<string>;
    add(variant: CreateVariantDto): Promise<ObjectId>;
}
