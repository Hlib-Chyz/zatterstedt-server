import { ObjectId } from 'mongodb';
import {
    CreateProductDto,
    ProductAdminDto,
    ProductPriceDto,
    UpdateProductDto,
} from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ProductFacade } from 'src/facades/product.facade';
import { ProductsService } from 'src/services/products.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly productFacade;
    constructor(productsService: ProductsService, productFacade: ProductFacade);
    getAllProductsForAdmin(): Promise<ProductAdminDto[]>;
    createProduct(product: CreateProductDto): Promise<SuccessDto>;
    updateProduct(product: UpdateProductDto): Promise<SuccessDto>;
    changePrice(id: ObjectId, { price }: ProductPriceDto): Promise<SuccessDto>;
}
