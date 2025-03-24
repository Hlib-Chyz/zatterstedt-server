'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.InventoryController = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('mongoose');
const inventory_dto_1 = require('../dto/inventory.dto');
const shared_dto_1 = require('../dto/shared.dto');
const error_filter_1 = require('../filters/error.filter');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const inventory_service_1 = require('../services/inventory.service');
let InventoryController = class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async getAll() {
        return this.inventoryService.getAll();
    }
    async add(inventory, res) {
        await this.inventoryService.add(inventory);
        res.status(204).send();
    }
    async update(inventory, res) {
        await this.inventoryService.update(inventory);
        res.status(204).send();
    }
    async updateUsed(body, res) {
        await this.inventoryService.updateUsed(body);
        res.status(204).send();
    }
    async delete(id, res) {
        await this.inventoryService.delete(id);
        res.status(204).send();
    }
};
exports.InventoryController = InventoryController;
tslib_1.__decorate(
    [
        (0, common_1.Get)(),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', []),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    InventoryController.prototype,
    'getAll',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Post)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__param(1, (0, common_1.Res)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [inventory_dto_1.CreateInventoryDto, Object]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    InventoryController.prototype,
    'add',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Put)(),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__param(1, (0, common_1.Res)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [inventory_dto_1.UpdateInventoryDto, Object]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    InventoryController.prototype,
    'update',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Put)('used'),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__param(1, (0, common_1.Res)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [inventory_dto_1.SetUsedFieldDto, Object]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    InventoryController.prototype,
    'updateUsed',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Delete)(':id'),
        tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
        tslib_1.__param(1, (0, common_1.Res)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [mongoose_1.Types.ObjectId, Object]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    InventoryController.prototype,
    'delete',
    null
);
exports.InventoryController = InventoryController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('inventory'),
        (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [inventory_service_1.InventoryService]),
    ],
    InventoryController
);
//# sourceMappingURL=inventory.controller.js.map
