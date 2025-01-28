import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';

@Injectable()
export class ProductsService {
    public constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        private readonly errorService: ErrorService
    ) {}

    public async getAll(): Promise<Product[]> {
        try {
            return this.productsRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get products');
            return [];
        }
    }

    public async update(product: UpdateProductDto): Promise<SuccessDto> {
        try {
            await this.getProduct(new ObjectId(product._id));
            await this.productsRepository.save(product);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update a product');
            return { success: true };
        }
    }

    public async changePrice(productId: ObjectId, newPrice: number): Promise<SuccessDto> {
        try {
            const product = await this.getProduct(productId);
            product.price = newPrice;
            await this.productsRepository.save(product);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change price of product');
            return { success: false };
        }
    }

    public async getProductByName(name: string): Promise<Product> {
        try {
            const product = await this.productsRepository.findOne({
                where: { name },
            });
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get product');
            return {} as Product;
        }
    }

    public async add(product: CreateProductDto): Promise<Product> {
        try {
            const newProduct = await this.productsRepository.save({
                name: product.name,
                price: product.price,
                description: product.description,
            });
            return newProduct;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add product');
            return {} as Product;
        }
    }

    public async getProduct(_id: ObjectId): Promise<Product> {
        try {
            const product = await this.productsRepository.findOne({
                where: { _id },
            });
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
