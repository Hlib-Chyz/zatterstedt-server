import { ObjectId } from 'mongodb';
import { SuccessDto } from 'src/dto/shared.dto';
import { CanSaveVariantsDto, CanSaveVariantsResponseDto, CreateVariantDto, CreateVariantsDto, VariantDto, VariantLockupDto } from 'src/dto/variant.dto';
import { Product } from 'src/entities/product.entity';
import { Variant } from 'src/entities/variant.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
import { StockService } from '@services/stock.service';
import { Order } from '@entities/order.entity';
export declare class VariantsService {
    private variantsRepository;
    private productsRepository;
    private ordersRepository;
    private readonly stockService;
    private readonly errorService;
    constructor(variantsRepository: Repository<Variant>, productsRepository: Repository<Product>, ordersRepository: Repository<Order>, stockService: StockService, errorService: ErrorService);
    getByProductId(productId: string): Promise<VariantDto[]>;
    deleteVariantsByProductId(productId: string): Promise<SuccessDto>;
    getProductId(variantId: string): Promise<string>;
    getVariants(): Promise<VariantLockupDto[]>;
    getVariantInfo(variantId: string, additionalInfo: string): Promise<string>;
    add(variant: CreateVariantDto): Promise<ObjectId>;
    setVariants(createVariants: CreateVariantsDto): Promise<SuccessDto>;
    canSaveVariants({ variantIds, }: CanSaveVariantsDto): Promise<CanSaveVariantsResponseDto>;
}
