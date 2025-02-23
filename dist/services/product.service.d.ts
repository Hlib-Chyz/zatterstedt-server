import { Model, Types } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ProductDocument } from 'src/schemas/product.schema';
import { ErrorService } from './error.service';
export declare class ProductService {
    private productModel;
    private readonly errorService;
    constructor(productModel: Model<ProductDocument>, errorService: ErrorService);
    getAll(): Promise<ProductDocument[]>;
    update(product: UpdateProductDto): Promise<SuccessDto>;
    updatePrice(productId: Types.ObjectId, price: number): Promise<SuccessDto>;
    getByName(name: string): Promise<ProductDocument>;
    getByNameWithoutCheck(name: string): Promise<ProductDocument | null>;
    add(product: CreateProductDto): Promise<ProductDocument>;
    getById(id: Types.ObjectId): Promise<ProductDocument>;
}
