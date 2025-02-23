import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Param, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { ProductService } from '@services/product.service';
import { Types } from 'mongoose';
import {
    CreateProductDto,
    ProductDto,
    ProductPriceDto,
    UpdateProductDto,
} from 'src/dto/product.dto';
import { ParseObjectIdPipe, SuccessDto } from 'src/dto/shared.dto';
import { ProductFacade } from 'src/facades/product.facade';
import { HttpExceptionFilter } from 'src/filters/error.filter';

@Controller('product')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class ProductController {
    public constructor(
        private readonly productService: ProductService,
        private readonly productFacade: ProductFacade
    ) {}

    @Get()
    public async getAll(): Promise<ProductDto[]> {
        return this.productFacade.getAll();
    }

    @Post()
    public async add(@Body() product: CreateProductDto): Promise<SuccessDto> {
        return this.productFacade.add(product);
    }

    @Put()
    public async update(@Body() product: UpdateProductDto): Promise<SuccessDto> {
        return this.productService.update(product);
    }

    @Put('price/:id')
    public async updatePrice(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() { price }: ProductPriceDto
    ): Promise<SuccessDto> {
        return this.productService.updatePrice(id, price);
    }
}
