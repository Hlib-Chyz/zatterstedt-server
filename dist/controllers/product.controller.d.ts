import { ProductService } from '@services/product.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import {
    CreateProductDto,
    ProductDto,
    ProductPriceDto,
    UpdateProductDto,
} from 'src/dto/product.dto';
import { ProductFacade } from 'src/facades/product.facade';
export declare class ProductController {
    private readonly productService;
    private readonly productFacade;
    constructor(productService: ProductService, productFacade: ProductFacade);
    getAll(): Promise<ProductDto[]>;
    add(product: CreateProductDto, res: Response): Promise<void>;
    update(product: UpdateProductDto, res: Response): Promise<void>;
    updatePrice(id: Types.ObjectId, { price }: ProductPriceDto, res: Response): Promise<void>;
}
