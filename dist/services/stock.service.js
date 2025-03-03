'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StockService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const stock_schema_1 = require('../schemas/stock.schema');
const error_service_1 = require('./error.service');
let StockService = class StockService {
    constructor(stockModel, errorService) {
        this.stockModel = stockModel;
        this.errorService = errorService;
    }
    async getByVariantId(variantId) {
        try {
            const stock = await this.stockModel.findOne({ variantId }).exec();
            if (!stock) {
                throw new common_1.NotFoundException('Stock not found');
            }
            return stock;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get stock by variant id');
            return {};
        }
    }
    async deleteManyByVariantIds(variantIds, session) {
        try {
            const result = await this.stockModel
                .deleteMany({ variantId: { $in: variantIds } })
                .session(session)
                .exec();
            if (result.deletedCount !== variantIds.length) {
                await session.abortTransaction();
                throw new common_1.NotFoundException('Some stocks not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to remove by variant ids');
        }
    }
    async add(stock, session) {
        try {
            const newStock = new this.stockModel({ ...stock, realizedParty: stock.total });
            newStock.$session(session);
            await newStock.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new stock');
        }
    }
    async increaseSold(variantId, quantity = 1, session) {
        try {
            const result = await this.stockModel
                .findOneAndUpdate(
                    { variantId },
                    {
                        $inc: { sold: quantity },
                    }
                )
                .session(session)
                .exec();
            if (!result) {
                throw new common_1.NotFoundException('Stock not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to increase sold');
        }
    }
    async updateRealizedParty(realizedPartyDto) {
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
                throw new common_1.NotFoundException('Stock not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set realized party');
        }
    }
    async decreaseRealizedParty(variantId, amount, session) {
        try {
            const result = await this.stockModel
                .findOneAndUpdate(
                    { variantId },
                    {
                        $inc: { realizedParty: -amount },
                    }
                )
                .session(session)
                .exec();
            if (!result) {
                throw new common_1.NotFoundException('Stock not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to decrease realized party');
        }
    }
};
exports.StockService = StockService;
exports.StockService = StockService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, mongoose_1.InjectModel)(stock_schema_1.Stock.name)),
        tslib_1.__metadata('design:paramtypes', [mongoose_2.Model, error_service_1.ErrorService]),
    ],
    StockService
);
//# sourceMappingURL=stock.service.js.map
