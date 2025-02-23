import { SuccessDto } from '@dto/shared.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { AdditionalCostService } from '@services/additional-cost.service';
import { DevelopmentCostService } from '@services/development-cost.service';
import { ErrorService } from '@services/error.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { ProductService } from '@services/product.service';
import { StockService } from '@services/stock.service';
import { VariantService } from '@services/variant.service';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto, ProductDto, ProductVariantDto } from 'src/dto/product.dto';

@Injectable()
export class ProductFacade {
    public constructor(
        private readonly errorService: ErrorService,
        private readonly productService: ProductService,
        private readonly additionalCostService: AdditionalCostService,
        private readonly developmentCostService: DevelopmentCostService,
        private readonly variantService: VariantService,
        private readonly stockService: StockService,
        private readonly manufacturingCostService: ManufacturingCostService
    ) {}

    public async getAll(): Promise<ProductDto[]> {
        try {
            const res: ProductDto[] = [];
            const products = await this.productService.getAll();
            for (const product of products) {
                const additionalCost = await this.additionalCostService.getByProductId(product._id);
                const developmentCosts = await this.developmentCostService.getByProductId(
                    product._id
                );
                const variants = await this.variantService.getAllByProductId(product._id);
                const manufacturingCost = await this.manufacturingCostService.getByProductId(
                    product._id
                );
                const resVariant: ProductVariantDto[] = [];
                for (const variant of variants) {
                    const stock = await this.stockService.getByVariantId(variant._id);
                    resVariant.push({
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
                    price: product.price,
                    variants: resVariant,
                    developmentCosts,
                    additionalCost: {
                        _id: additionalCost._id,
                        cost: additionalCost.cost,
                    },
                    manufacturingCost: {
                        _id: manufacturingCost._id,
                        inventory: manufacturingCost.inventory,
                        job: manufacturingCost.job,
                    },
                });
            }
            return plainToInstance(ProductDto, res, { excludeExtraneousValues: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all products');
            return [];
        }
    }

    public async add(product: CreateProductDto): Promise<SuccessDto> {
        try {
            const existingProduct = await this.productService.getByNameWithoutCheck(product.name);
            if (existingProduct) {
                throw new ConflictException('A product with the given name already exists');
            }
            const newProduct = await this.productService.add(product);
            await this.additionalCostService.add(newProduct._id);
            await this.manufacturingCostService.add(newProduct._id);
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new product');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }
}
