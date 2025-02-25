'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdditionalCostService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const additional_cost_schema_1 = require('../schemas/additional-cost.schema');
const error_service_1 = require('./error.service');
let AdditionalCostService = class AdditionalCostService {
    constructor(additionalCostModel, errorService) {
        this.additionalCostModel = additionalCostModel;
        this.errorService = errorService;
    }
    async update(additionalCost) {
        try {
            const updatedCost = await this.additionalCostModel
                .findByIdAndUpdate(additionalCost._id, additionalCost)
                .exec();
            if (!updatedCost) {
                throw new common_1.NotFoundException('Additional cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update additional cost');
        }
    }
    async add(productId) {
        try {
            const newCost = new this.additionalCostModel({ productId });
            await newCost.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add additional cost');
        }
    }
    async getByProductId(productId) {
        try {
            const additionalCost = await this.additionalCostModel.findOne({ productId }).exec();
            if (!additionalCost) {
                throw new common_1.NotFoundException('Additional cost not found');
            }
            return additionalCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get additional cost by product id');
            return {};
        }
    }
};
exports.AdditionalCostService = AdditionalCostService;
exports.AdditionalCostService = AdditionalCostService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(
            0,
            (0, mongoose_1.InjectModel)(additional_cost_schema_1.AdditionalCost.name)
        ),
        tslib_1.__metadata('design:paramtypes', [mongoose_2.Model, error_service_1.ErrorService]),
    ],
    AdditionalCostService
);
//# sourceMappingURL=additional-cost.service.js.map
