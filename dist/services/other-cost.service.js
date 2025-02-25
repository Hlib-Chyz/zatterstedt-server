'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OtherCostService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const class_transformer_1 = require('class-transformer');
const mongoose_2 = require('mongoose');
const other_cost_dto_1 = require('../dto/other-cost.dto');
const other_cost_schema_1 = require('../schemas/other-cost.schema');
const error_service_1 = require('./error.service');
let OtherCostService = class OtherCostService {
    constructor(otherCostModel, errorService) {
        this.otherCostModel = otherCostModel;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            const res = await this.otherCostModel.find().exec();
            return (0, class_transformer_1.plainToInstance)(other_cost_dto_1.OtherCostDto, res, {
                excludeExtraneousValues: true,
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all other costs');
            return [];
        }
    }
    async add(otherCost) {
        try {
            const newOtherCost = new this.otherCostModel(otherCost);
            await newOtherCost.save();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create other costs');
        }
    }
    async update(otherCost) {
        try {
            const result = await this.otherCostModel
                .findByIdAndUpdate(otherCost._id, otherCost)
                .exec();
            if (!result) {
                throw new common_1.NotFoundException('Other cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update other cost');
        }
    }
    async delete(id) {
        try {
            const result = await this.otherCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException('Other cost not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete other cost');
        }
    }
};
exports.OtherCostService = OtherCostService;
exports.OtherCostService = OtherCostService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, mongoose_1.InjectModel)(other_cost_schema_1.OtherCost.name)),
        tslib_1.__metadata('design:paramtypes', [mongoose_2.Model, error_service_1.ErrorService]),
    ],
    OtherCostService
);
//# sourceMappingURL=other-cost.service.js.map
