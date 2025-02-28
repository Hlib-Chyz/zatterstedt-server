import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, Types } from 'mongoose';
import { SetRealizedPartyDto } from 'src/dto/stock.dto';
import { Stock, StockDocument } from 'src/schemas/stock.schema';
import { CreateStockType } from 'src/types/stock.types';
import { ErrorService } from './error.service';

@Injectable()
export class StockService {
    public constructor(
        @InjectModel(Stock.name) private stockModel: Model<StockDocument>,
        @InjectConnection() private readonly connection: Connection,
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

    // TODO TRANSACTION
    public async deleteManyByVariantIds(variantIds: Types.ObjectId[]): Promise<void> {
        const session = await this.connection.startSession();
        session.startTransaction();
        try {
            const result = await this.stockModel
                .deleteMany({ variantId: { $in: variantIds } })
                .session(session)
                .exec();
            if (result.deletedCount !== variantIds.length) {
                throw new NotFoundException('Some stocks not found');
            }
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            this.errorService.throwError(error, 'Failed to remove by variant ids');
        } finally {
            session.endSession();
        }
    }

    public async add(stock: CreateStockType): Promise<void> {
        try {
            const newStock = new this.stockModel({ ...stock, realizedParty: stock.total });
            await newStock.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new stock');
        }
    }

    public async increaseSold(variantId: Types.ObjectId, quantity = 1): Promise<void> {
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
        } catch (error) {
            this.errorService.throwError(error, 'Failed to increase sold');
        }
    }

    public async updateRealizedParty(realizedPartyDto: SetRealizedPartyDto): Promise<void> {
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
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set realized party');
        }
    }

    public async decreaseRealizedParty(variantId: Types.ObjectId, amount: number): Promise<void> {
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
        } catch (error) {
            this.errorService.throwError(error, 'Failed to decrease realized party');
        }
    }
}
