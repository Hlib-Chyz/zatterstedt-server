'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.InventoryService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const mongodb_1 = require('mongodb');
const inventory_entity_1 = require('../entities/inventory.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
let InventoryService = class InventoryService {
    constructor(inventoryRepository, errorService) {
        this.inventoryRepository = inventoryRepository;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            const inventory = await this.inventoryRepository.find();
            return inventory.reverse();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all inventory');
            return [];
        }
    }
    async create(inventory) {
        try {
            await this.inventoryRepository.save({ ...inventory, paid: 0 });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to create inventory');
            return { success: false };
        }
    }
    async update(inventory) {
        try {
            const foundInventory = await this.getInventory(inventory._id);
            await this.inventoryRepository.save({ ...foundInventory, ...inventory });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update inventory');
            return { success: false };
        }
    }
    async delete(_id) {
        try {
            await this.inventoryRepository.delete({ _id });
            return { _id };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to delete inventory');
            return { _id };
        }
    }
    async changeInventoryAmount(_id, used, paid) {
        try {
            const foundInventory = await this.getInventory(new mongodb_1.ObjectId(_id));
            await this.inventoryRepository.save({
                ...foundInventory,
                _id: new mongodb_1.ObjectId(_id),
                used: foundInventory.used + used,
                paid: foundInventory.paid + paid,
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to change inventory amount');
            return { success: false };
        }
    }
    async setUsedField(body) {
        try {
            const inventory = await this.getInventory(body._id);
            await this.inventoryRepository.save({
                ...inventory,
                used: body.used,
            });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set used field');
            return { success: false };
        }
    }
    async getInventory(_id) {
        try {
            const foundInventory = await this.inventoryRepository.findOne({
                where: { _id },
            });
            if (!foundInventory) {
                throw new common_1.NotFoundException('Inventory not found');
            }
            return foundInventory;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get inventory');
            return {};
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.Inventory)),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            error_service_1.ErrorService,
        ]),
    ],
    InventoryService
);
//# sourceMappingURL=inventory.service.js.map
