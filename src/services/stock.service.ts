import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuccessDto } from 'src/dto/shared.dto';
import { CreateStockDto, SetRealizedPartyDto, StockDto } from 'src/dto/stock.dto';
import { Stock } from 'src/entities/stock.entity';
import { Repository } from 'typeorm';
import { ErrorService } from './error.service';

@Injectable()
export class StockService {
    public constructor(
        @InjectRepository(Stock) private stockRepository: Repository<Stock>,
        private readonly errorService: ErrorService
    ) {}

    public async getByVariantId(variantId: string): Promise<StockDto> {
        try {
            const stock = await this.getStock(variantId);
            return stock;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get stock by variant id');
            return {} as StockDto;
        }
    }

    public async removeByVariantId(variantIds: string[]): Promise<SuccessDto> {
        try {
            for (const variantId of variantIds) {
                const stock = await this.getByVariantId(variantId);
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
            await this.stockRepository.save({ ...stock, sold: 0, realizedParty: stock.total });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new stock');
            return { success: false };
        }
    }

    public async increaseSold(variantId: string, quantity = 1): Promise<SuccessDto> {
        try {
            const stock = await this.getStock(variantId);
            await this.stockRepository.save({ ...stock, sold: stock.sold + quantity });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to increase sold');
            return { success: false };
        }
    }

    public async setRealizedParty(realizedPartyDto: SetRealizedPartyDto): Promise<SuccessDto> {
        try {
            const stock = await this.getStock(realizedPartyDto.variantId);
            await this.stockRepository.save({
                ...stock,
                realizedParty: realizedPartyDto.realizedParty,
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set realized party');
            return { success: false };
        }
    }

    public async decreaseRealizedParty(variantId: string, amount: number): Promise<SuccessDto> {
        try {
            const stock = await this.getStock(variantId);
            await this.stockRepository.save({
                ...stock,
                realizedParty: stock.realizedParty - amount,
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to decrease realized party');
            return { success: false };
        }
    }

    private async getStock(variantId: string): Promise<Stock> {
        try {
            const stock = await this.stockRepository.findOne({
                where: { variantId },
            });
            if (!stock) {
                throw new NotFoundException('Stock not found');
            }
            return stock;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get stock');
            return {} as Stock;
        }
    }
}
