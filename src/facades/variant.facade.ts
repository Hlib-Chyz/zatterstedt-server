import { SuccessDto } from '@dto/shared.dto';
import {
    CanSaveVariantDto,
    CanSaveVariantResponseDto,
    UpdateVariantDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorService } from '@services/error.service';
import { OrderService } from '@services/order.service';
import { ProductService } from '@services/product.service';
import { StockService } from '@services/stock.service';
import { VariantService } from '@services/variant.service';
import { plainToInstance } from 'class-transformer';
import { Types } from 'mongoose';

@Injectable()
export class VariantFacade {
    public constructor(
        private readonly stockService: StockService,
        private readonly variantService: VariantService,
        private readonly productService: ProductService,
        private readonly orderService: OrderService,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<VariantLockupDto[]> {
        try {
            const variants = await this.variantService.getAll();
            const data = await Promise.all(
                variants.map(async (variant) => {
                    const product = await this.productService.getById(variant.productId);
                    return {
                        _id: variant._id,
                        name: `${product?.name ?? 'Unknown'} ${variant.color}/${variant.size}`,
                    };
                })
            );
            return plainToInstance(VariantLockupDto, data, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variants');
            return [];
        }
    }

    public async getVariantInfo(
        variantId: Types.ObjectId,
        additionalInfo: string
    ): Promise<string> {
        try {
            const variant = await this.variantService.getById(variantId);
            if (!variant) {
                throw new NotFoundException('Variant not found');
            }
            const product = await this.productService.getById(variant.productId);
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return `${product.name} ${variant.color}/${variant.size} - ${additionalInfo}`;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variant info');
            return '';
        }
    }

    public async updateVariant(createVariant: UpdateVariantDto): Promise<SuccessDto> {
        try {
            await this.variantService.deleteManyByProductId(createVariant.productId);
            await this.stockService.deleteManyByVariantIds(createVariant.oldVariantIds);
            for (const variant of createVariant.variants) {
                const newVariantId = await this.variantService.add({
                    size: variant.size,
                    color: variant.color,
                    productId: createVariant.productId,
                });
                await this.stockService.add({
                    total: variant.quantity,
                    variantId: newVariantId,
                });
            }
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set variants');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async canSaveVariants({
        variantIds,
    }: CanSaveVariantDto): Promise<CanSaveVariantResponseDto> {
        try {
            let canSaveVariant = true;
            for (const id of variantIds) {
                const orders = await this.orderService.getByVariantId(id);
                if (orders.length) {
                    canSaveVariant = false;
                    break;
                }
            }
            return plainToInstance(
                CanSaveVariantResponseDto,
                { canSaveVariant },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get canSaveVariant property');
            return plainToInstance(
                CanSaveVariantResponseDto,
                { canSaveVariant: false },
                { excludeExtraneousValues: true }
            );
        }
    }
}
