"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const inventory_schema_1 = require("../schemas/inventory.schema");
const error_service_1 = require("./error.service");
let InventoryService = class InventoryService {
    constructor(inventoryModel, errorService) {
        this.inventoryModel = inventoryModel;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            const inventory = await this.inventoryModel.find().exec();
            return inventory.reverse();
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get all inventory');
            return [];
        }
    }
    async add(inventory) {
        try {
            const inventoryCost = new this.inventoryModel(inventory);
            await inventoryCost.save();
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to create inventory');
            return { success: false };
        }
    }
    async update(inventory) {
        try {
            const result = await this.inventoryModel
                .findByIdAndUpdate(inventory._id, inventory)
                .exec();
            if (!result) {
                throw new common_1.NotFoundException('Inventory not found');
            }
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to update inventory');
            return { success: false };
        }
    }
    async delete(id) {
        try {
            const result = await this.inventoryModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException('Inventory not found');
            }
            return { id };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to delete inventory');
            return { id };
        }
    }
    async updateUsedAndPaid(id, used, paid) {
        try {
            const result = await this.inventoryModel
                .findByIdAndUpdate(id, {
                $inc: { used, paid },
            })
                .exec();
            if (!result) {
                throw new common_1.NotFoundException('Inventory not found');
            }
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to change inventory amount');
            return { success: false };
        }
    }
    async updateUsed(body) {
        try {
            const result = await this.inventoryModel
                .findByIdAndUpdate(body._id, { used: body.used })
                .exec();
            if (!result) {
                throw new common_1.NotFoundException('Inventory not found');
            }
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to set used field');
            return { success: false };
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)(inventory_schema_1.Inventory.name)),
    tslib_1.__metadata("design:paramtypes", [mongoose_2.Model,
        error_service_1.ErrorService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map