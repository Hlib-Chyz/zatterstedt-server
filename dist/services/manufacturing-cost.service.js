'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManufacturingCostService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const class_transformer_1 = require('class-transformer');
const mongoose_2 = require('mongoose');
const shared_dto_1 = require('../dto/shared.dto');
const manufacturing_cost_schema_1 = require('../schemas/manufacturing-cost.schema');
const error_service_1 = require('./error.service');
let ManufacturingCostService = class ManufacturingCostService {
    constructor(manufacturingCostModel, errorService) {
        this.manufacturingCostModel = manufacturingCostModel;
        this.errorService = errorService;
    }
    async getByProductId(productId) {
        try {
            const manufacturingCost = await this.manufacturingCostModel
                .findOne({
                    productId,
                })
                .exec();
            if (!manufacturingCost) {
                throw new common_1.NotFoundException('Manufacturing cost not found');
            }
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by product id');
            return {};
        }
    }
    async getById(id) {
        try {
            const manufacturingCost = await this.manufacturingCostModel.findById(id).exec();
            if (!manufacturingCost) {
                throw new common_1.NotFoundException('Manufacturing cost not found');
            }
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by id');
            return {};
        }
    }
    async add(productId) {
        try {
            const createdManufacturingCost = new this.manufacturingCostModel({ productId });
            await createdManufacturingCost.save();
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create manufacturing cost');
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }
    async updateInventory(inventory, manufacturingCost) {
        try {
            const updatedManufacturingCost = await this.manufacturingCostModel
                .findByIdAndUpdate(manufacturingCost, { inventory })
                .exec();
            if (!updatedManufacturingCost) {
                throw new common_1.NotFoundException('Manufacturing cost not found');
            }
            return updatedManufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add manufacturing cost');
            return {};
        }
    }
    async updateJob(id, job) {
        try {
            const result = await this.manufacturingCostModel.findByIdAndUpdate(id, { job }).exec();
            if (!result) {
                throw new common_1.NotFoundException('Fixed cost not found');
            }
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update manufacturing cost');
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }
};
exports.ManufacturingCostService = ManufacturingCostService;
exports.ManufacturingCostService = ManufacturingCostService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(
            0,
            (0, mongoose_1.InjectModel)(manufacturing_cost_schema_1.ManufacturingCost.name)
        ),
        tslib_1.__metadata('design:paramtypes', [mongoose_2.Model, error_service_1.ErrorService]),
    ],
    ManufacturingCostService
);
//# sourceMappingURL=manufacturing-cost.service.js.map
