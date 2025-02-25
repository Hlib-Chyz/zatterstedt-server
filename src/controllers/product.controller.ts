import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Res,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { ProductService } from '@services/product.service';
import { Response } from 'express';
import { Types } from 'mongoose';
import {
    CreateProductDto,
    ProductDto,
    ProductPriceDto,
    UpdateProductDto,
} from 'src/dto/product.dto';
import { ParseObjectIdPipe } from 'src/dto/shared.dto';
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
    public async add(@Body() product: CreateProductDto, @Res() res: Response): Promise<void> {
        await this.productFacade.add(product);
        res.status(204).send();
    }

    @Put()
    public async update(@Body() product: UpdateProductDto, @Res() res: Response): Promise<void> {
        await this.productService.update(product);
        res.status(204).send();
    }

    @Put('price/:id')
    public async updatePrice(
        @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
        @Body() { price }: ProductPriceDto,
        @Res() res: Response
    ): Promise<void> {
        await this.productService.updatePrice(id, price);
        res.status(204).send();
    }
}
