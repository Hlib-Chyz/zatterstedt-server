'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DevelopmentCostService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const class_transformer_1 = require('class-transformer');
const mongoose_2 = require('mongoose');
const shared_dto_1 = require('../dto/shared.dto');
const development_cost_schema_1 = require('../schemas/development-cost.schema');
const error_service_1 = require('./error.service');
let DevelopmentCostService = class DevelopmentCostService {
    constructor(developmentCostModel, errorService) {
        this.developmentCostModel = developmentCostModel;
        this.errorService = errorService;
    }
    async getByProductId(productId) {
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
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add development cost');
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }
    async update(developmentCost) {
        try {
            const updatedDevelopmentCost = await this.developmentCostModel
                .findByIdAndUpdate(developmentCost._id, developmentCost)
                .exec();
            if (!updatedDevelopmentCost) {
                throw new common_1.NotFoundException('Development cost not found');
            }
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: true },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update development cost');
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.SuccessDto,
                { success: false },
                { excludeExtraneousValues: true }
            );
        }
    }
    async delete(id) {
        try {
            const result = await this.developmentCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException('Development cost not found');
            }
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.DeleteGetDto,
                { id },
                { excludeExtraneousValues: true }
            );
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete development cost');
            return (0, class_transformer_1.plainToInstance)(
                shared_dto_1.DeleteGetDto,
                { id },
                { excludeExtraneousValues: true }
            );
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
