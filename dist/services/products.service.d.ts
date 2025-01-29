import { ObjectId } from 'mongodb';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';
export declare class ProductsService {
    private productsRepository;
    private readonly errorService;
    constructor(productsRepository: Repository<Product>, errorService: ErrorService);
    getAll(): Promise<Product[]>;
    update(product: UpdateProductDto): Promise<SuccessDto>;
    changePrice(productId: ObjectId, newPrice: number): Promise<SuccessDto>;
    getProductByName(name: string): Promise<Product>;
    add(product: CreateProductDto): Promise<Product>;
    getProduct(_id: ObjectId): Promise<Product>;
}
