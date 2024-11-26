import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import {
    CreateProductDto,
    ProductAdminDto,
    ProductDto,
    ProductOrderDto,
    ProductVariantDto,
    UpdateProductDto,
} from 'src/dto/product.dto';
import { SuccessDto } from 'src/dto/shared.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { AdditionalCostsService } from './additional-costs.service';
import { DevelopmentCostsService } from './development-costs.service';
import { ErrorService } from './error.service';
import { ManufacturingCostsService } from './manufacturing-costs.service';
import { OrdersService } from './orders.service';
import { StockService } from './stock.service';
import { VariantsService } from './variants.service';

@Injectable()
export class ProductsService {
    public constructor(
        @InjectRepository(Product) private productsRepository: Repository<Product>,
        private readonly errorService: ErrorService,
        private readonly additionalCostsService: AdditionalCostsService,
        private readonly developmentCostsService: DevelopmentCostsService,
        private readonly variantsService: VariantsService,
        private readonly ordersService: OrdersService,
        private readonly stockService: StockService,
        private readonly manufacturingCostsService: ManufacturingCostsService
    ) {}

    public async getAllProductsForAdmin(): Promise<ProductAdminDto[]> {
        try {
            const res: ProductAdminDto[] = [];
            const products = await this.productsRepository.find();
            for (const product of products) {
                const additionalCost =
                    await this.additionalCostsService.getAdditionalCostByProductId(product._id);
                const developmentCosts = await this.developmentCostsService.getByProductId(
                    product._id
                );
                const variants = await this.variantsService.getByProductId(product._id.toString());
                const manufacturingCost = await this.manufacturingCostsService.getByProductId(
                    product._id
                );
                let orders: ProductOrderDto[] = [];
                const resVariants: ProductVariantDto[] = [];
                for (const variant of variants) {
                    const curOrders = await this.ordersService.getByVariantId(
                        variant._id.toString()
                    );
                    orders = [
                        ...orders,
                        ...curOrders.map((ord) => ({
                            _id: ord._id,
                            date: ord.date,
                            userName: ord.contacts,
                            variants: ord.variants.map((vari) => ({
                                name: `${ord.userName} - ${variant._id.toString()}`,
                                quantity: vari.quantity,
                                cost: 0,
                            })),
                        })),
                    ];
                    const stock = await this.stockService.getByVariantId(variant._id);
                    resVariants.push({
                        _id: variant._id,
                        size: variant.size,
                        color: variant.color,
                        stock: {
                            total: stock.total,
                            sold: stock.sold,
                            realizedParty: stock.realizedParty,
                        },
                    });
                }
                res.push({
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,

                    variants: resVariants,

                    developmentCosts: developmentCosts?.map((val) => ({
                        _id: val._id,
                        date: val.date,
                        description: val.description,
                        cost: val.cost,
                    })),
                    additionalCost: { _id: additionalCost?._id, cost: additionalCost?.cost },
                    manufacturingCost: {
                        _id: manufacturingCost._id,
                        inventory: manufacturingCost.inventory,
                        job: manufacturingCost.job,
                    },

                    orders,
                });
            }
            return res;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all products');
            return [];
        }
    }

    public async add(product: CreateProductDto): Promise<SuccessDto> {
        try {
            const existingProduct = await this.productsRepository.findOne({
                where: { name: product.name },
            });
            if (existingProduct) {
                throw new ConflictException('A product with the given name already exists');
            }
            const newProduct = await this.productsRepository.save({
                name: product.name,
                price: product.price,
                description: product.description,
            });
            await this.additionalCostsService.addOne({
                productId: newProduct._id.toString(),
            });
            await this.manufacturingCostsService.create({
                productId: newProduct._id.toString(),
            });
            for (const variant of product.variants) {
                const newVariantId = await this.variantsService.add({
                    size: variant.size,
                    color: variant.color,
                    productId: newProduct._id.toString(),
                });
                await this.stockService.add({
                    total: variant.quantity,
                    variantId: newVariantId.toString(),
                    realizedParty: variant.realizedParty,
                });
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new product');
            return { success: false };
        }
    }

    public async update(product: UpdateProductDto): Promise<SuccessDto> {
        try {
            const updatedProduct = await this.productsRepository.findOne({
                where: { _id: new ObjectId(product._id) },
            });
            if (!updatedProduct) {
                throw new NotFoundException('Product not found');
            }
            updatedProduct.name = product.name;
            updatedProduct.price = product.price;
            updatedProduct.description = product.description;
            await this.productsRepository.save(updatedProduct);
            const variantIds = await this.variantsService.getVariantIdsByProductId(
                product._id.toString()
            );
            await this.stockService.removeByVariantId(variantIds);
            await this.variantsService.deleteVariantsByProductId(product._id.toString());
            for (const variant of product.variants) {
                const newVariantId = await this.variantsService.add({
                    size: variant.size,
                    color: variant.color,
                    productId: updatedProduct._id.toString(),
                });
                await this.stockService.add({
                    total: variant.quantity,
                    variantId: newVariantId.toString(),
                    realizedParty: variant.realizedParty,
                });
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update a product');
            return { success: true };
        }
    }

    public async getOneById(productId: ObjectId): Promise<ProductDto> {
        try {
            const product = await this.productsRepository.findOne({
                where: { _id: new ObjectId(productId) },
            });
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            return product;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get one product');
            return {} as ProductDto;
        }
    }

    public async changePrice(productId: ObjectId, newPrice: number): Promise<SuccessDto> {
        try {
            const product = await this.getOneById(productId);
            product.price = newPrice;
            await this.productsRepository.save(product);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change price of product');
            return { success: false };
        }
    }
}
