"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedCostsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fixed_cost_entity_1 = require("../entities/fixed-cost.entity");
const typeorm_2 = require("typeorm");
const error_service_1 = require("./error.service");
let FixedCostsService = class FixedCostsService {
    constructor(fixedCostsRepository, errorService) {
        this.fixedCostsRepository = fixedCostsRepository;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            return await this.fixedCostsRepository.find();
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get all fixed cost');
            return [];
        }
    }
    async create(fixedCost) {
        try {
            await this.fixedCostsRepository.save(fixedCost);
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to create fixed cost');
            return { success: false };
        }
    }
    async update(fixedCost) {
        try {
            const foundFixedCost = await this.fixedCostsRepository.findOne({
                where: { _id: fixedCost._id },
            });
            if (!foundFixedCost) {
                throw new common_1.NotFoundException('Fixed cost not found');
            }
            await this.fixedCostsRepository.save(fixedCost);
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to update fixed cost');
            return { success: false };
        }
    }
    async delete(_id) {
        try {
            await this.fixedCostsRepository.delete({ _id });
            return { _id };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to delete cost field');
            return { _id };
        }
    }
};
exports.FixedCostsService = FixedCostsService;
exports.FixedCostsService = FixedCostsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(fixed_cost_entity_1.FixedCost)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        error_service_1.ErrorService])
], FixedCostsService);
//# sourceMappingURL=fixed-costs.service.js.map