'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManufacturingCostController = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongodb_1 = require('mongodb');
const manufacturing_cost_dto_1 = require('../dto/manufacturing-cost.dto');
const shared_dto_1 = require('../dto/shared.dto');
const manufacturing_cost_facade_1 = require('../facades/manufacturing-cost.facade');
const error_filter_1 = require('../filters/error.filter');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const manufacturing_cost_service_1 = require('../services/manufacturing-cost.service');
let ManufacturingCostController = class ManufacturingCostController {
    constructor(manufacturingCostService, manufacturingCostFacade) {
        this.manufacturingCostService = manufacturingCostService;
        this.manufacturingCostFacade = manufacturingCostFacade;
    }
    async updateJob(id, { job }) {
        return this.manufacturingCostService.updateJob(id, job);
    }
    async updateInventory(id, manufacturingCostInventory) {
        return this.manufacturingCostFacade.updateInventory(id, manufacturingCostInventory);
    }
    async canSaveInventory(body) {
        return this.manufacturingCostFacade.canSaveInventory(body);
    }
};
exports.ManufacturingCostController = ManufacturingCostController;
tslib_1.__decorate(
    [
        (0, common_1.Put)('job/:id'),
        tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
        tslib_1.__param(1, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [
            mongodb_1.ObjectId,
            manufacturing_cost_dto_1.ManufacturingCostJobDto,
        ]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    ManufacturingCostController.prototype,
    'updateJob',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Put)('inventory/:id'),
        tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
        tslib_1.__param(1, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [
            mongodb_1.ObjectId,
            manufacturing_cost_dto_1.ManufacturingCostInventoryDto,
        ]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    ManufacturingCostController.prototype,
    'updateInventory',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Post)('can-save-inventory'),
        tslib_1.__param(0, (0, common_1.Body)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [manufacturing_cost_dto_1.CanSaveInventoryDto]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    ManufacturingCostController.prototype,
    'canSaveInventory',
    null
);
exports.ManufacturingCostController = ManufacturingCostController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('manufacturing-cost'),
        (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [
            manufacturing_cost_service_1.ManufacturingCostService,
            manufacturing_cost_facade_1.ManufacturingCostFacade,
        ]),
    ],
    ManufacturingCostController
);
//# sourceMappingURL=manufacturing-cost.controller.js.map
