import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { SuccessDto } from 'src/dto/shared.dto';
import { CreateStockDto, SetRealizedPartyDto } from 'src/dto/stock.dto';
import { Stock } from 'src/schemas/stock.schema';
import { ErrorService } from './error.service';

@Injectable()
export class StockService {
    public constructor(
        @InjectModel(Stock.name) private stockModel: Model<Stock>,
        private readonly errorService: ErrorService
    ) {}

    public async getByVariantId(variantId: ObjectId): Promise<Stock> {
        try {
            const stock = await this.stockModel.findOne({ variantId }).exec();
            if (!stock) {
                throw new NotFoundException('Stock not found');
            }
            return stock;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get stock by variant id');
            return {} as Stock;
        }
    }

    public async deleteManyByVariantIds(variantIds: ObjectId[]): Promise<SuccessDto> {
        // TODO - transactions
        try {
            for (const variantId of variantIds) {
                const result = await this.stockModel.findOneAndDelete({ variantId }).exec();
                if (!result) {
                    throw new NotFoundException('Stock not found');
                }
            }
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to remove by variant id');
            return new SuccessDto({ success: false });
        }
    }

    public async add(stock: CreateStockDto): Promise<SuccessDto> {
        try {
            const newStock = new this.stockModel({ ...stock, realizedParty: stock.total });
            await newStock.save();
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new stock');
            return new SuccessDto({ success: false });
        }
    }

    public async increaseSold(variantId: ObjectId, quantity = 1): Promise<SuccessDto> {
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
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to increase sold');
            return new SuccessDto({ success: false });
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
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set realized party');
            return new SuccessDto({ success: false });
        }
    }

    public async decreaseRealizedParty(variantId: ObjectId, amount: number): Promise<SuccessDto> {
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
            return new SuccessDto({ success: true });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to decrease realized party');
            return new SuccessDto({ success: false });
        }
    }
}
