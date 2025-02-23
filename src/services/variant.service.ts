import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVariantType } from '@strategies/variant.types';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { SuccessDto } from 'src/dto/shared.dto';
import { Variant, VariantDocument } from 'src/schemas/variant.schema';
import { ErrorService } from './error.service';

@Injectable()
export class VariantService {
    public constructor(
        @InjectModel(Variant.name) private variantModel: Model<VariantDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async getAllByProductId(productId: Types.ObjectId): Promise<VariantDocument[]> {
        try {
            return await this.variantModel.find({ productId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variants by product id');
            return [];
        }
    }

    public async getById(id: Types.ObjectId): Promise<VariantDocument> {
        try {
            const variant = await this.variantModel.findById(id).exec();
            if (!variant) {
                throw new NotFoundException('Variant not found');
            }
            return variant;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get variant');
            return {} as VariantDocument;
        }
    }

    public async getAll(): Promise<VariantDocument[]> {
        try {
            return await this.variantModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all variants');
            return [];
        }
    }

    public async deleteManyByProductId(productId: Types.ObjectId): Promise<SuccessDto> {
        try {
            await this.variantModel.deleteMany({ productId }).exec();
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to remove variants');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async getProductId(variantId: Types.ObjectId): Promise<Types.ObjectId> {
        try {
            const variant = await this.variantModel.findById(variantId).exec();
            if (!variant) {
                throw new NotFoundException('Variant not found');
            }
            return variant.productId;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product id');
            return {} as Types.ObjectId;
        }
    }

    public async add(variant: CreateVariantType): Promise<Types.ObjectId> {
        try {
            const newVariant = new this.variantModel(variant);
            const savedVariant = await newVariant.save();
            return savedVariant._id;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new variant');
            return '' as unknown as Types.ObjectId;
        }
    }
}
