'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdditionalCostsService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const additional_cost_entity_1 = require('../entities/additional-cost.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
let AdditionalCostsService = class AdditionalCostsService {
    constructor(additionalCostsRepository, errorService) {
        this.additionalCostsRepository = additionalCostsRepository;
        this.errorService = errorService;
    }
    async update(additionalCost) {
        try {
            await this.getAdditionalCost({
                _id: additionalCost._id,
            });
            await this.additionalCostsRepository.save(additionalCost);
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update additional cost');
            return { success: false };
        }
    }
    async addOne(additionalCost) {
        try {
            await this.additionalCostsRepository.save({ ...additionalCost, cost: 0 });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add additional cost');
            return { success: false };
        }
    }
    async getAdditionalCostByProductId(productId) {
        try {
            return await this.getAdditionalCost({
                productId: productId.toString(),
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get additional cost by product id');
            return {};
        }
    }
    async getAdditionalCost(where) {
        try {
            const additionalCost = await this.additionalCostsRepository.findOne({
                where,
            });
            if (!additionalCost) {
                throw new common_1.NotFoundException('Additional cost not found');
            }
            return additionalCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get additional cost');
            return {};
        }
    }
};
exports.AdditionalCostsService = AdditionalCostsService;
exports.AdditionalCostsService = AdditionalCostsService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(
            0,
            (0, typeorm_1.InjectRepository)(additional_cost_entity_1.AdditionalCost)
        ),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            error_service_1.ErrorService,
        ]),
    ],
    AdditionalCostsService
);
//# sourceMappingURL=additional-costs.service.js.map
