import {
    CanSaveVariantDto,
    CanSaveVariantResponseDto,
    UpdateVariantDto,
    VariantLockupDto,
} from '@dto/variant.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ErrorService } from '@services/error.service';
import { OrderService } from '@services/order.service';
import { ProductService } from '@services/product.service';
import { StockService } from '@services/stock.service';
import { VariantService } from '@services/variant.service';
import { plainToInstance } from 'class-transformer';
import { Connection, Types } from 'mongoose';

@Injectable()
export class VariantFacade {
    public constructor(
        private readonly stockService: StockService,
        private readonly variantService: VariantService,
        private readonly productService: ProductService,
        private readonly orderService: OrderService,
        private readonly errorService: ErrorService,
        @InjectConnection() private readonly connection: Connection
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

    // TODO TRANSACTION
    public async updateVariant(createVariant: UpdateVariantDto): Promise<void> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            await Promise.all([
                this.variantService.deleteManyByProductId(createVariant.productId, session),
                this.stockService.deleteManyByVariantIds(createVariant.oldVariantIds, session),
            ]);

            const variantPromises = createVariant.variants.map(async (variant) => {
                const newVariantId = await this.variantService.add(
                    {
                        size: variant.size,
                        color: variant.color,
                        productId: createVariant.productId,
                    },
                    session
                );
                return this.stockService.add(
                    {
                        total: variant.quantity,
                        variantId: newVariantId,
                    },
                    session
                );
            });

            await Promise.all(variantPromises);

            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.errorService.throwError(error, 'Failed to set variants');
        } finally {
            session.endSession();
        }
    }

    public async canSaveVariants({
        variantIds,
    }: CanSaveVariantDto): Promise<CanSaveVariantResponseDto> {
        try {
            const ordersByVariant = await Promise.all(
                variantIds.map((id) => this.orderService.getByVariantId(id))
            );
            return plainToInstance(
                CanSaveVariantResponseDto,
                { canSaveVariants: !ordersByVariant.some((orders) => orders.length > 0) },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get canSaveVariants property');
            return plainToInstance(
                CanSaveVariantResponseDto,
                { canSaveVariants: false },
                { excludeExtraneousValues: true }
            );
        }
    }
}
