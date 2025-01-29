import { SuccessDto } from '@dto/shared.dto';
import { AdditionalCostsService } from '@services/additional-costs.service';
import { DevelopmentCostsService } from '@services/development-costs.service';
import { ErrorService } from '@services/error.service';
import { ManufacturingCostsService } from '@services/manufacturing-costs.service';
import { ProductsService } from '@services/products.service';
import { StockService } from '@services/stock.service';
import { VariantsService } from '@services/variants.service';
import { CreateProductDto, ProductAdminDto } from 'src/dto/product.dto';
export declare class ProductFacade {
    private readonly errorService;
    private readonly productsService;
    private readonly additionalCostsService;
    private readonly developmentCostsService;
    private readonly variantsService;
    private readonly stockService;
    private readonly manufacturingCostsService;
    constructor(
        errorService: ErrorService,
        productsService: ProductsService,
        additionalCostsService: AdditionalCostsService,
        developmentCostsService: DevelopmentCostsService,
        variantsService: VariantsService,
        stockService: StockService,
        manufacturingCostsService: ManufacturingCostsService
    );
    getAll(): Promise<ProductAdminDto[]>;
    add(product: CreateProductDto): Promise<SuccessDto>;
}
