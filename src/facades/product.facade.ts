import { SuccessDto } from '@dto/shared.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { AdditionalCostsService } from '@services/additional-costs.service';
import { DevelopmentCostsService } from '@services/development-costs.service';
import { ErrorService } from '@services/error.service';
import { ManufacturingCostsService } from '@services/manufacturing-costs.service';
import { ProductsService } from '@services/products.service';
import { StockService } from '@services/stock.service';
import { VariantsService } from '@services/variants.service';
import { CreateProductDto, ProductAdminDto, ProductVariantDto } from 'src/dto/product.dto';

@Injectable()
export class ProductFacade {
    public constructor(
        private readonly errorService: ErrorService,
        private readonly productsService: ProductsService,
        private readonly additionalCostsService: AdditionalCostsService,
        private readonly developmentCostsService: DevelopmentCostsService,
        private readonly variantsService: VariantsService,
        private readonly stockService: StockService,
        private readonly manufacturingCostsService: ManufacturingCostsService
    ) {}

    public async getAll(): Promise<ProductAdminDto[]> {
        try {
            const res: ProductAdminDto[] = [];
            const products = await this.productsService.getAll();
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
                const resVariants: ProductVariantDto[] = [];
                for (const variant of variants) {
                    const stock = await this.stockService.getByVariantId(variant._id.toString());
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
            const existingProduct = await this.productsService.getProductByNameWithoutCheck(
                product.name
            );
            if (existingProduct) {
                throw new ConflictException('A product with the given name already exists');
            }
            const newProduct = await this.productsService.add(product);
            await this.additionalCostsService.addOne({
                productId: newProduct._id.toString(),
            });
            await this.manufacturingCostsService.create({
                productId: newProduct._id.toString(),
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new product');
            return { success: false };
        }
    }
}
