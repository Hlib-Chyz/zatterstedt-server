'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StockService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const stock_entity_1 = require('../entities/stock.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
let StockService = class StockService {
    constructor(stockRepository, errorService) {
        this.stockRepository = stockRepository;
        this.errorService = errorService;
    }
    async getByVariantId(variantId) {
        try {
            const stock = await this.getStock(variantId);
            return stock;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get stock by variant id');
            return {};
        }
    }
    async removeByVariantId(variantIds) {
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
    async add(stock) {
        try {
            const existingStock = await this.stockRepository.findOne({
                where: { variantId: stock.variantId },
            });
            if (existingStock) {
                throw new common_1.ConflictException(
                    'A stock with the given variant already exists'
                );
            }
            await this.stockRepository.save({ ...stock, sold: 0, realizedParty: stock.total });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create a new stock');
            return { success: false };
        }
    }
    async increaseSold(variantId, quantity = 1) {
        try {
            const stock = await this.getStock(variantId);
            await this.stockRepository.save({ ...stock, sold: stock.sold + quantity });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to increase sold');
            return { success: false };
        }
    }
    async setRealizedParty(realizedPartyDto) {
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
    async decreaseRealizedParty(variantId, amount) {
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
    async getStock(variantId) {
        const stock = await this.stockRepository.findOne({
            where: { variantId },
        });
        if (!stock) {
            throw new common_1.NotFoundException('Stock not found');
        }
        return stock;
    }
};
exports.StockService = StockService;
exports.StockService = StockService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, typeorm_1.InjectRepository)(stock_entity_1.Stock)),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            error_service_1.ErrorService,
        ]),
    ],
    StockService
);
//# sourceMappingURL=stock.service.js.map
