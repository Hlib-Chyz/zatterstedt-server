import { ObjectId } from 'mongodb';
import {
    CreateProductDto,
    ProductDto,
    ProductPriceDto,
    UpdateProductDto,
} from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ProductFacade } from 'src/facades/product.facade';
import { ProductService } from '@services/product.service';
export declare class ProductController {
    private readonly productService;
    private readonly productFacade;
    constructor(productService: ProductService, productFacade: ProductFacade);
    getAll(): Promise<ProductDto[]>;
    add(product: CreateProductDto): Promise<SuccessDto>;
    update(product: UpdateProductDto): Promise<SuccessDto>;
    updatePrice(id: ObjectId, { price }: ProductPriceDto): Promise<SuccessDto>;
}
