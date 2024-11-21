import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { SuccessDto } from 'src/dto/shared.dto';
import { CreateVariantDto, VariantDto, VariantLockupDto } from 'src/dto/variant.dto';
import { Product } from 'src/entities/product.entity';
import { Variant } from 'src/entities/variant.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';

@Injectable()
export class VariantsService {
    public constructor(
        @InjectRepository(Variant) private variantsRepository: Repository<Variant>,
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        private readonly errorService: ErrorService
    ) {}

    public async getByProductId(productId: string): Promise<VariantDto[]> {
        try {
            return await this.variantsRepository.find({
                where: { productId },
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variants by product id');
            return [];
        }
    }

    public async getVariantIdsByProductId(productId: string): Promise<ObjectId[]> {
        try {
            const variants = await this.variantsRepository.find({
                where: { productId },
            });
            return variants.map((variant) => variant._id);
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variants by product id');
            return [];
        }
    }

    public async deleteVariantsByProductId(productId: string): Promise<SuccessDto> {
        try {
            const variants = await this.getByProductId(productId);
            await this.variantsRepository.remove(variants);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to remove variants');
            return { success: false };
        }
    }

    public async getProductId(variantId: string): Promise<string> {
        try {
            const variant = await this.variantsRepository.findOne({
                where: { _id: new ObjectId(variantId) },
            });
            return variant?.productId ?? '';
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product id');
            return '';
        }
    }

    public async getVariants(): Promise<VariantLockupDto[]> {
        try {
            const variants = await this.variantsRepository.find();
            const data = await Promise.all(
                variants.map(async (variant) => {
                    const product = await this.productsRepository.findOne({
                        where: { _id: new ObjectId(variant.productId) },
                    });
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
            const variant = await this.variantsRepository.findOne({
                where: { _id: new ObjectId(variantId) },
            });
            if (!variant) {
                throw new NotFoundException('Variant not found');
            }
            const product = await this.productsRepository.findOne({
                where: { _id: new ObjectId(variant.productId) },
            });
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return `${product.name} ${variant.color}/${variant.size} - ${additionalInfo}`;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variant info');
            return '';
        }
    }

    public async add(variant: CreateVariantDto): Promise<ObjectId> {
        try {
            const { _id } = await this.variantsRepository.save(variant);
            return _id;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new variant');
            return '' as unknown as ObjectId;
        }
    }
}
