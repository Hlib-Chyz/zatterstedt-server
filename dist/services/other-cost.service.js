"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherCostService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const other_cost_schema_1 = require("../schemas/other-cost.schema");
const error_service_1 = require("./error.service");
let OtherCostService = class OtherCostService {
    constructor(otherCostModel, errorService) {
        this.otherCostModel = otherCostModel;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            return await this.otherCostModel.find().exec();
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get all other costs');
            return [];
        }
    }
    async add(otherCost) {
        try {
            const newOtherCost = new this.otherCostModel(otherCost);
            await newOtherCost.save();
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to create other costs');
            return { success: false };
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
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to update other cost');
            return { success: false };
        }
    }
    async delete(id) {
        try {
            const result = await this.otherCostModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException('Other cost not found');
            }
            return { id };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to delete other cost');
            return { id };
        }
    }
};
exports.OtherCostService = OtherCostService;
exports.OtherCostService = OtherCostService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(other_cost_schema_1.OtherCost.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model,
        error_service_1.ErrorService])
], OtherCostService);
//# sourceMappingURL=other-cost.service.js.map