'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManufacturingCostsService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const manufacturing_cost_entity_1 = require('../entities/manufacturing-cost.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
let ManufacturingCostsService = class ManufacturingCostsService {
    constructor(manufacturingCostsRepository, errorService) {
        this.manufacturingCostsRepository = manufacturingCostsRepository;
        this.errorService = errorService;
    }
    async getByProductId(productId) {
        try {
            const manufacturingCost = await this.getManufacturingCost({
                productId: productId.toString(),
            });
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost by product id');
            return {};
        }
    }
    async create(manufacturingCost) {
        try {
            await this.manufacturingCostsRepository.save({
                ...manufacturingCost,
                job: [],
                inventory: [],
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create manufacturing cost');
            return { success: false };
        }
    }
    async add(inventory, manufacturingCost) {
        try {
            return await this.manufacturingCostsRepository.save({
                ...manufacturingCost,
                inventory,
            });
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add manufacturing cost');
            return {};
        }
    }
    async update(_id, job) {
        try {
            const manufacturingCost = await this.getManufacturingCost({ _id });
            await this.manufacturingCostsRepository.save({ ...manufacturingCost, job });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update manufacturing cost');
            return { success: false };
        }
    }
    async getManufacturingCost(where) {
        try {
            const manufacturingCost = await this.manufacturingCostsRepository.findOne({
                where,
            });
            if (!manufacturingCost) {
                throw new common_1.NotFoundException('Manufacturing cost not found');
            }
            return manufacturingCost;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get manufacturing cost');
            return {};
        }
    }
};
exports.ManufacturingCostsService = ManufacturingCostsService;
exports.ManufacturingCostsService = ManufacturingCostsService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(
            0,
            (0, typeorm_1.InjectRepository)(manufacturing_cost_entity_1.ManufacturingCost)
        ),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            error_service_1.ErrorService,
        ]),
    ],
    ManufacturingCostsService
);
//# sourceMappingURL=manufacturing-costs.service.js.map
