'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DevelopmentCostService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const development_cost_schema_1 = require('../schemas/development-cost.schema');
const error_service_1 = require('./error.service');
let DevelopmentCostService = class DevelopmentCostService {
    constructor(developmentCostModel, errorService) {
        this.developmentCostModel = developmentCostModel;
        this.errorService = errorService;
    }
    async getAllByProductId(productId) {
        try {
            return await this.developmentCostModel.find({ productId }).exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get development costs by productId');
            return [];
        }
    }
    async add(developmentCost) {
        try {
            const createdDevelopmentCost = new this.developmentCostModel(developmentCost);
            await createdDevelopmentCost.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add development cost');
        }
    }
    async update(developmentCost) {
        try {
            const updatedDevelopmentCost = await this.developmentCostModel
                .findOneAndUpdate({ _id: developmentCost._id }, developmentCost)
                .exec();
            if (!updatedDevelopmentCost) {
                throw new common_1.NotFoundException('Development cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update development cost');
        }
    }
    async delete(id) {
        try {
            const result = await this.developmentCostModel.findOneAndDelete({ _id: id }).exec();
            if (!result) {
                throw new common_1.NotFoundException('Development cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete development cost');
        }
    }
};
exports.DevelopmentCostService = DevelopmentCostService;
exports.DevelopmentCostService = DevelopmentCostService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(
            0,
            (0, mongoose_1.InjectModel)(development_cost_schema_1.DevelopmentCost.name)
        ),
        tslib_1.__metadata('design:paramtypes', [mongoose_2.Model, error_service_1.ErrorService]),
    ],
    DevelopmentCostService
);
//# sourceMappingURL=development-cost.service.js.map
