"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedCostService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fixed_cost_schema_1 = require("../schemas/fixed-cost.schema");
const error_service_1 = require("./error.service");
let FixedCostService = class FixedCostService {
    constructor(fixedCostModel, errorService) {
        this.fixedCostModel = fixedCostModel;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            return await this.fixedCostModel.find().exec();
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get all fixed costs');
            return [];
        }
    }
    async add(fixedCost) {
        try {
            const createdFixedCost = new this.fixedCostModel(fixedCost);
            await createdFixedCost.save();
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to add fixed cost');
            return { success: false };
        }
    }
    async update(fixedCost) {
        try {
            const result = await this.fixedCostModel
                .findByIdAndUpdate(fixedCost._id, fixedCost)
                .exec();
            if (!result) {
                throw new common_1.NotFoundException('Fixed cost not found');
            }
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to update fixed cost');
            return { success: false };
        }
    }
    async delete(id) {
        try {
            const result = await this.fixedCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException('Fixed cost not found');
            }
            return { id };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to delete fixed cost');
            return { id };
        }
    }
};
exports.FixedCostService = FixedCostService;
exports.FixedCostService = FixedCostService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(fixed_cost_schema_1.FixedCost.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model,
        error_service_1.ErrorService])
], FixedCostService);
//# sourceMappingURL=fixed-cost.service.js.map