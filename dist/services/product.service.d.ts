import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { ErrorService } from './error.service';
export declare class ProductService {
    private productModel;
    private readonly errorService;
    constructor(productModel: Model<Product>, errorService: ErrorService);
    getAll(): Promise<ProductDocument[]>;
    update(product: UpdateProductDto): Promise<SuccessDto>;
    updatePrice(productId: ObjectId, price: number): Promise<SuccessDto>;
    getByName(name: string): Promise<Product>;
    getByNameWithoutCheck(name: string): Promise<Product | null>;
    add(product: CreateProductDto): Promise<ProductDocument>;
    getById(id: ObjectId): Promise<Product>;
}
