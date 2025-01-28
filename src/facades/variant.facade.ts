import { SuccessDto } from '@dto/shared.dto';
import {
    CanSaveVariantsDto,
    CanSaveVariantsResponseDto,
    CreateVariantsDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorService } from '@services/error.service';
import { OrdersService } from '@services/orders.service';
import { ProductsService } from '@services/products.service';
import { StockService } from '@services/stock.service';
import { VariantsService } from '@services/variants.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class VariantFacade {
    public constructor(
        private readonly stockService: StockService,
        private readonly variantsService: VariantsService,
        private readonly productsService: ProductsService,
        private readonly ordersService: OrdersService,
        private readonly errorService: ErrorService
    ) {}

    public async getVariants(): Promise<VariantLockupDto[]> {
        try {
            const variants = await this.variantsService.getAll();
            const data = await Promise.all(
                variants.map(async (variant) => {
                    const product = await this.productsService.getProduct(
                        new ObjectId(variant.productId)
                    );
                    return {
                        _id: variant._id,
                        name: `${product?.name ?? 'Unknown'} ${variant.color}/${variant.size}`,
                    };
                })
            );
            return data;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variants');
            return [];
        }
    }

    public async getVariantInfo(variantId: string, additionalInfo: string): Promise<string> {
        try {
            const variant = await this.variantsService.getVariant(new ObjectId(variantId));
            if (!variant) {
                throw new NotFoundException('Variant not found');
            }
            const product = await this.productsService.getProduct(new ObjectId(variant.productId));
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return `${product.name} ${variant.color}/${variant.size} - ${additionalInfo}`;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variant info');
            return '';
        }
    }

    public async setVariants(createVariants: CreateVariantsDto): Promise<SuccessDto> {
        try {
            await this.variantsService.deleteVariantsByProductId(createVariants.productId);
            await this.stockService.removeByVariantId(createVariants.oldVariantIds);
            for (const variant of createVariants.variants) {
                const newVariantId = await this.variantsService.add({
                    size: variant.size,
                    color: variant.color,
                    productId: createVariants.productId,
                });
                await this.stockService.add({
                    total: variant.quantity,
                    variantId: newVariantId.toString(),
                });
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set variants');
            return { success: false };
        }
    }

    public async canSaveVariants({
        variantIds,
    }: CanSaveVariantsDto): Promise<CanSaveVariantsResponseDto> {
        try {
            let canSaveVariants = true;
            for (const id of variantIds) {
                const orders = await this.ordersService.getByVariantId(id);
                if (orders.length) {
                    canSaveVariants = false;
                    break;
                }
            }
            return { canSaveVariants };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add inventory');
            return { canSaveVariants: false };
        }
    }
}
