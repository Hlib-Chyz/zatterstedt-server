"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentCostsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const development_cost_entity_1 = require("../entities/development-cost.entity");
const typeorm_2 = require("typeorm");
const error_service_1 = require("./error.service");
let DevelopmentCostsService = class DevelopmentCostsService {
    constructor(developmentCostsRepository, errorService) {
        this.developmentCostsRepository = developmentCostsRepository;
        this.errorService = errorService;
    }
    async getByProductId(productId) {
        try {
            return await this.developmentCostsRepository.find({
                where: { productId: productId.toString() },
            });
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get development costs by productId');
            return [];
        }
    }
    async add(developmentCost) {
        try {
            await this.developmentCostsRepository.save(developmentCost);
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to add development cost');
            return { success: false };
        }
    }
    async update(developmentCost) {
        try {
            const foundDevelopmentCost = await this.developmentCostsRepository.findOne({
                where: { _id: developmentCost._id },
            });
            if (!foundDevelopmentCost) {
                throw new common_1.NotFoundException('Development Cost not found');
            }
            await this.developmentCostsRepository.save({
                ...foundDevelopmentCost,
                ...developmentCost,
            });
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to add development cost');
            return { success: false };
        }
    }
    async delete(_id) {
        try {
            await this.developmentCostsRepository.delete({ _id });
            return { _id };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to delete development cost');
            return { _id };
        }
    }
};
exports.DevelopmentCostsService = DevelopmentCostsService;
exports.DevelopmentCostsService = DevelopmentCostsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(development_cost_entity_1.DevelopmentCost)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        error_service_1.ErrorService])
], DevelopmentCostsService);
//# sourceMappingURL=development-costs.service.js.map