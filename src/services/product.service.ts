import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { ErrorService } from './error.service';

@Injectable()
export class ProductService {
    public constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
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

    public async update(product: UpdateProductDto): Promise<void> {
        try {
            const result = await this.productModel
                .findOneAndUpdate({ _id: product._id }, product)
                .exec();
            if (!result) {
                throw new NotFoundException('Product not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update a product');
        }
    }

    public async updatePrice(productId: Types.ObjectId, price: number): Promise<void> {
        try {
            const updatedProduct = await this.productModel
                .findOneAndUpdate({ _id: productId }, { price })
                .exec();
            if (!updatedProduct) {
                throw new NotFoundException('Product not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change price of product');
        }
    }

    public async getByName(name: string): Promise<ProductDocument> {
        try {
            const product = await this.productModel.findOne({ name }).exec();
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return {} as ProductDocument;
        }
    }

    public async getByNameWithoutCheck(name: string): Promise<ProductDocument | null> {
        try {
            return await this.productModel.findOne({ name }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return null;
        }
    }

    public async add(product: CreateProductDto, session: ClientSession): Promise<ProductDocument> {
        try {
            const newProduct = new this.productModel(product);
            newProduct.$session(session);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add product');
            return {} as ProductDocument;
        }
    }

    public async getById(id: Types.ObjectId): Promise<ProductDocument> {
        try {
            const product = await this.productModel.findById(id).exec();
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return {} as ProductDocument;
        }
    }
}
