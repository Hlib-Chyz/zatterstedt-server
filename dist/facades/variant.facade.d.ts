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
import { Connection, Types } from 'mongoose';
export declare class VariantFacade {
    private readonly stockService;
    private readonly variantService;
    private readonly productService;
    private readonly orderService;
    private readonly errorService;
    private readonly connection;
    constructor(
        stockService: StockService,
        variantService: VariantService,
        productService: ProductService,
        orderService: OrderService,
        errorService: ErrorService,
        connection: Connection
    );
    getAll(): Promise<VariantLockupDto[]>;
    getVariantInfo(variantId: Types.ObjectId, additionalInfo: string): Promise<string>;
    updateVariant(createVariant: UpdateVariantDto): Promise<void>;
    canSaveVariants({ variantIds }: CanSaveVariantDto): Promise<CanSaveVariantResponseDto>;
}
