import { SuccessDto } from '@dto/shared.dto';
import {
    CanSaveVariantDto,
    CanSaveVariantResponseDto,
    UpdateVariantDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { ErrorService } from '@services/error.service';
import { OrderService } from '@services/order.service';
import { ProductService } from '@services/product.service';
import { StockService } from '@services/stock.service';
import { VariantService } from '@services/variant.service';
import { Types } from 'mongoose';
export declare class VariantFacade {
    private readonly stockService;
    private readonly variantService;
    private readonly productService;
    private readonly orderService;
    private readonly errorService;
    constructor(
        stockService: StockService,
        variantService: VariantService,
        productService: ProductService,
        orderService: OrderService,
        errorService: ErrorService
    );
    getAll(): Promise<VariantLockupDto[]>;
    getVariantInfo(variantId: Types.ObjectId, additionalInfo: string): Promise<string>;
    updateVariant(createVariant: UpdateVariantDto): Promise<SuccessDto>;
    canSaveVariants({ variantIds }: CanSaveVariantDto): Promise<CanSaveVariantResponseDto>;
}
