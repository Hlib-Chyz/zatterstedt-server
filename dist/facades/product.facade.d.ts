import { AdditionalCostService } from '@services/additional-cost.service';
import { DevelopmentCostService } from '@services/development-cost.service';
import { ErrorService } from '@services/error.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { ProductService } from '@services/product.service';
import { StockService } from '@services/stock.service';
import { VariantService } from '@services/variant.service';
import { CreateProductDto, ProductDto } from 'src/dto/product.dto';
export declare class ProductFacade {
    private readonly errorService;
    private readonly productService;
    private readonly additionalCostService;
    private readonly developmentCostService;
    private readonly variantService;
    private readonly stockService;
    private readonly manufacturingCostService;
    constructor(
        errorService: ErrorService,
        productService: ProductService,
        additionalCostService: AdditionalCostService,
        developmentCostService: DevelopmentCostService,
        variantService: VariantService,
        stockService: StockService,
        manufacturingCostService: ManufacturingCostService
    );
    getAll(): Promise<ProductDto[]>;
    add(product: CreateProductDto): Promise<void>;
}
