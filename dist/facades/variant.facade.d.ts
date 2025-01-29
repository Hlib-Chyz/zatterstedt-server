import { SuccessDto } from '@dto/shared.dto';
import {
    CanSaveVariantsDto,
    CanSaveVariantsResponseDto,
    CreateVariantsDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { ErrorService } from '@services/error.service';
import { OrdersService } from '@services/orders.service';
import { ProductsService } from '@services/products.service';
import { StockService } from '@services/stock.service';
import { VariantsService } from '@services/variants.service';
export declare class VariantFacade {
    private readonly stockService;
    private readonly variantsService;
    private readonly productsService;
    private readonly ordersService;
    private readonly errorService;
    constructor(
        stockService: StockService,
        variantsService: VariantsService,
        productsService: ProductsService,
        ordersService: OrdersService,
        errorService: ErrorService
    );
    getVariants(): Promise<VariantLockupDto[]>;
    getVariantInfo(variantId: string, additionalInfo: string): Promise<string>;
    setVariants(createVariants: CreateVariantsDto): Promise<SuccessDto>;
    canSaveVariants({ variantIds }: CanSaveVariantsDto): Promise<CanSaveVariantsResponseDto>;
}
