import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { SuccessDto } from 'src/dto/shared.dto';
import { SetRealizedPartyDto } from 'src/dto/stock.dto';
import { Stock, StockDocument } from 'src/schemas/stock.schema';
import { CreateStockType } from 'src/types/stock.types';
import { ErrorService } from './error.service';

@Injectable()
export class StockService {
    public constructor(
        @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
        private readonly errorService: ErrorService
    ) {}

    public async getByVariantId(variantId: Types.ObjectId): Promise<StockDocument> {
        try {
            const stock = await this.stockModel.findOne({ variantId }).exec();
            if (!stock) {
                throw new NotFoundException('Stock not found');
            }
            return stock;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get stock by variant id');
            return {} as StockDocument;
        }
    }

    public async deleteManyByVariantIds(variantIds: Types.ObjectId[]): Promise<SuccessDto> {
        // TODO - transactions
        try {
            for (const variantId of variantIds) {
                const result = await this.stockModel.findOneAndDelete({ variantId }).exec();
                if (!result) {
                    throw new NotFoundException('Stock not found');
                }
            }
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to remove by variant id');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async add(stock: CreateStockType): Promise<SuccessDto> {
        try {
            const newStock = new this.stockModel({ ...stock, realizedParty: stock.total });
            await newStock.save();
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new stock');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async increaseSold(variantId: Types.ObjectId, quantity = 1): Promise<SuccessDto> {
        try {
            const result = await this.stockModel
                .findOneAndUpdate(
                    { variantId },
                    {
                        $inc: { sold: quantity },
                    }
                )
                .exec();
            if (!result) {
                throw new NotFoundException('Stock not found');
            }
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to increase sold');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async updateRealizedParty(realizedPartyDto: SetRealizedPartyDto): Promise<SuccessDto> {
        try {
            const result = await this.stockModel
                .findOneAndUpdate(
                    { variantId: realizedPartyDto.variantId },
                    {
                        realizedParty: realizedPartyDto.realizedParty,
                    }
                )
                .exec();
            if (!result) {
                throw new NotFoundException('Stock not found');
            }
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set realized party');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }

    public async decreaseRealizedParty(
        variantId: Types.ObjectId,
        amount: number
    ): Promise<SuccessDto> {
        try {
            const result = await this.stockModel
                .findOneAndUpdate(
                    { variantId },
                    {
                        $inc: { realizedParty: -amount },
                    }
                )
                .exec();
            if (!result) {
                throw new NotFoundException('Stock not found');
            }
            return plainToInstance(
                SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to decrease realized party');
            return plainToInstance(
                SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }
}
