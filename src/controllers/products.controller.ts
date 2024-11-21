import { Body, Controller, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import {
    CreateProductDto,
    ProductAdminDto,
    ProductPriceDto,
    UpdateProductDto,
} from 'src/dto/product.dto';
import { ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
@UseFilters(new HttpExceptionFilter())
export class ProductsController {
    public constructor(private readonly productsService: ProductsService) {}

    @Get('admin')
    public async getAllProductsForAdmin(): Promise<ProductAdminDto[]> {
        return this.productsService.getAllProductsForAdmin();
    }

    @Post()
    public async createProduct(@Body() product: CreateProductDto): Promise<SuccessDto> {
        return this.productsService.add(product);
    }

    @Put()
    public async updateProduct(@Body() product: UpdateProductDto): Promise<SuccessDto> {
        return this.productsService.update(product);
    }

    @Put('price/:id')
    public async changePrice(
        @Param('id', ParseObjectIdPipe) id: ObjectId,
        @Body() { price }: ProductPriceDto
    ): Promise<SuccessDto> {
        return this.productsService.changePrice(id, price);
    }
}
