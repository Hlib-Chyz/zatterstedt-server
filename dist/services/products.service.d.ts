import { ObjectId } from 'mongodb';
import {
    CreateProductDto,
    ProductAdminDto,
    ProductDto,
    UpdateProductDto,
} from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { AdditionalCostsService } from './additional-costs.service';
import { DevelopmentCostsService } from './development-costs.service';
import { ErrorService } from './error.service';
import { ManufacturingCostsService } from './manufacturing-costs.service';
import { StockService } from './stock.service';
import { VariantsService } from './variants.service';
export declare class ProductsService {
    private productsRepository;
    private readonly errorService;
    private readonly additionalCostsService;
    private readonly developmentCostsService;
    private readonly variantsService;
    private readonly stockService;
    private readonly manufacturingCostsService;
    constructor(
        productsRepository: Repository<Product>,
        errorService: ErrorService,
        additionalCostsService: AdditionalCostsService,
        developmentCostsService: DevelopmentCostsService,
        variantsService: VariantsService,
        stockService: StockService,
        manufacturingCostsService: ManufacturingCostsService
    );
    getAllProductsForAdmin(): Promise<ProductAdminDto[]>;
    add(product: CreateProductDto): Promise<SuccessDto>;
    update(product: UpdateProductDto): Promise<SuccessDto>;
    getOneById(productId: ObjectId): Promise<ProductDto>;
    changePrice(productId: ObjectId, newPrice: number): Promise<SuccessDto>;
    private getProduct;
}
