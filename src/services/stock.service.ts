import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { SuccessDto } from 'src/dto/shared.dto';
import { CreateStockDto, StockDto } from 'src/dto/stock.dto';
import { Stock } from 'src/entities/stock.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';

@Injectable()
export class StockService {
    public constructor(
        @InjectRepository(Stock) private stockRepository: Repository<Stock>,
        private readonly errorService: ErrorService
    ) {}

    public async getByVariantId(variantId: ObjectId): Promise<StockDto> {
        try {
            const stock = await this.stockRepository.findOne({
                where: { variantId: variantId.toString() },
            });
            if (!stock) {
                throw new NotFoundException('Stock not found');
            }
            return stock;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get stock by variant id');
            return {} as StockDto;
        }
    }

    public async removeByVariantId(variantIds: ObjectId[]): Promise<SuccessDto> {
        try {
            for (const variantId of variantIds) {
                const stock = await this.getByVariantId(variantId);
                if (!stock) {
                    throw new NotFoundException('Stock not found');
                }
                await this.stockRepository.delete({ _id: stock._id });
            }
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to remove by variant id');
            return { success: false };
        }
    }

    public async add(stock: CreateStockDto): Promise<SuccessDto> {
        try {
            const existingStock = await this.stockRepository.findOne({
                where: { variantId: stock.variantId },
            });
            if (existingStock) {
                throw new ConflictException('A stock with the given variant already exists');
            }
            await this.stockRepository.save({ ...stock, sold: 0 });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new stock');
            return { success: false };
        }
    }

    public async increaseSold(variantId: string, quantity = 1): Promise<SuccessDto> {
        try {
            const stock = await this.stockRepository.findOne({
                where: { variantId },
            });
            if (!stock) {
                throw new NotFoundException('Stock not found');
            }
            await this.stockRepository.save({ ...stock, sold: stock.sold + quantity });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to increase sold');
            return { success: false };
        }
    }
}
