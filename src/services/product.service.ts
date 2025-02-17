import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { ErrorService } from './error.service';

@Injectable()
export class ProductService {
    public constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<ProductDocument[]> {
        try {
            return this.productModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get products');
            return [];
        }
    }

    public async update(product: UpdateProductDto): Promise<SuccessDto> {
        try {
            const result = await this.productModel.findByIdAndUpdate(product._id, product).exec();
            if (!result) {
                throw new NotFoundException('Product not found');
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update a product');
            return { success: false };
        }
    }

    public async updatePrice(productId: ObjectId, price: number): Promise<SuccessDto> {
        try {
            const updatedProduct = await this.productModel
                .findByIdAndUpdate(productId, { price })
                .exec();
            if (!updatedProduct) {
                throw new NotFoundException('Product not found');
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change price of product');
            return { success: false };
        }
    }

    public async getByName(name: string): Promise<Product> {
        try {
            const product = await this.productModel.findOne({ name }).exec();
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return {} as Product;
        }
    }

    public async getByNameWithoutCheck(name: string): Promise<Product | null> {
        try {
            return await this.productModel.findOne({ name }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return null;
        }
    }

    public async add(product: CreateProductDto): Promise<ProductDocument> {
        try {
            const newProduct = new this.productModel(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add product');
            return {} as ProductDocument;
        }
    }

    public async getById(id: ObjectId): Promise<Product> {
        try {
            const product = await this.productModel.findById(id).exec();
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return {} as Product;
        }
    }
}
