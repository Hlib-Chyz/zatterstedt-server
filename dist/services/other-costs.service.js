"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtherCostsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mongodb_1 = require("mongodb");
const other_cost_entity_1 = require("../entities/other-cost.entity");
const typeorm_2 = require("typeorm");
const error_service_1 = require("./error.service");
let OtherCostsService = class OtherCostsService {
    constructor(otherCostsRepository, errorService) {
        this.otherCostsRepository = otherCostsRepository;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            return await this.otherCostsRepository.find();
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get all other costs');
            return [];
        }
    }
    async create(otherCost) {
        try {
            await this.otherCostsRepository.save(otherCost);
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to create other costs');
            return { success: false };
        }
    }
    async update(otherCost) {
        try {
            const foundOtherCosts = await this.otherCostsRepository.findOne({
                where: { _id: otherCost._id },
            });
            if (!foundOtherCosts) {
                throw new common_1.NotFoundException('Other cost not found');
            }
            await this.otherCostsRepository.save(otherCost);
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to update other cost');
            return { success: false };
        }
    }
    async delete(_id) {
        try {
            await this.otherCostsRepository.delete({ _id: new mongodb_1.ObjectId(_id) });
            return { _id };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to delete cost field');
            return { _id };
        }
    }
};
exports.OtherCostsService = OtherCostsService;
exports.OtherCostsService = OtherCostsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(other_cost_entity_1.OtherCost)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        error_service_1.ErrorService])
], OtherCostsService);
//# sourceMappingURL=other-costs.service.js.map