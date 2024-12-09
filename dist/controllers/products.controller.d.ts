import { ObjectId } from 'mongodb';
import { CreateProductDto, ProductAdminDto, ProductPriceDto, UpdateProductDto } from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { ProductsService } from 'src/services/products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAllProductsForAdmin(): Promise<ProductAdminDto[]>;
    createProduct(product: CreateProductDto): Promise<SuccessDto>;
    updateProduct(product: UpdateProductDto): Promise<SuccessDto>;
    changePrice(id: ObjectId, { price }: ProductPriceDto): Promise<SuccessDto>;
}
