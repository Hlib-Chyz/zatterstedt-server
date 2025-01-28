import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { SuccessDto } from 'src/dto/shared.dto';
import { CreateVariantDto, VariantDto } from 'src/dto/variant.dto';
import { Variant } from 'src/entities/variant.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';

@Injectable()
export class VariantsService {
    public constructor(
        @InjectRepository(Variant) private variantsRepository: Repository<Variant>,
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

    public async getVariant(_id: ObjectId): Promise<Variant> {
        try {
            const variant = await this.variantsRepository.findOne({
                where: { _id },
            });
            if (!variant) {
                throw new NotFoundException('Variant not found');
            }
            return variant;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variant');
            return {} as Variant;
        }
    }

    public async getAll(): Promise<VariantDto[]> {
        try {
            return await this.variantsRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all variants');
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
