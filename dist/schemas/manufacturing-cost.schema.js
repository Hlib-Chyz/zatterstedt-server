'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManufacturingCostSchema = exports.ManufacturingCost = void 0;
const tslib_1 = require('tslib');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const inventory_schema_1 = require('./inventory.schema');
const product_schema_1 = require('./product.schema');
let Job = class Job {};
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
        tslib_1.__metadata('design:type', String),
    ],
    Job.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Number, required: true }),
        tslib_1.__metadata('design:type', Number),
    ],
    Job.prototype,
    'cost',
    void 0
);
Job = tslib_1.__decorate([(0, mongoose_1.Schema)()], Job);
const JobSchema = mongoose_1.SchemaFactory.createForClass(Job);
let InventoryItem = class InventoryItem {};
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({
            type: mongoose_2.Types.ObjectId,
            required: true,
            unique: true,
            ref: inventory_schema_1.Inventory.name,
        }),
        tslib_1.__metadata('design:type', mongoose_2.Types.ObjectId),
    ],
    InventoryItem.prototype,
    'inventoryId',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Number, required: true }),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryItem.prototype,
    'quantityInCost',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Number, required: true }),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryItem.prototype,
    'quantityInUse',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Boolean, required: true }),
        tslib_1.__metadata('design:type', Boolean),
    ],
    InventoryItem.prototype,
    'duringManufacture',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Number, required: true }),
        tslib_1.__metadata('design:type', Number),
    ],
    InventoryItem.prototype,
    'cost',
    void 0
);
InventoryItem = tslib_1.__decorate([(0, mongoose_1.Schema)()], InventoryItem);
const InventorySchema = mongoose_1.SchemaFactory.createForClass(InventoryItem);
let ManufacturingCost = class ManufacturingCost {};
exports.ManufacturingCost = ManufacturingCost;
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({
            type: mongoose_2.Types.ObjectId,
            required: true,
            unique: true,
            ref: product_schema_1.Product.name,
        }),
        tslib_1.__metadata('design:type', mongoose_2.Types.ObjectId),
    ],
    ManufacturingCost.prototype,
    'productId',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: [JobSchema], default: [] }),
        tslib_1.__metadata('design:type', Array),
    ],
    ManufacturingCost.prototype,
    'job',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: [InventorySchema], default: [] }),
        tslib_1.__metadata('design:type', Array),
    ],
    ManufacturingCost.prototype,
    'inventory',
    void 0
);
exports.ManufacturingCost = ManufacturingCost = tslib_1.__decorate(
    [(0, mongoose_1.Schema)()],
    ManufacturingCost
);
exports.ManufacturingCostSchema = mongoose_1.SchemaFactory.createForClass(ManufacturingCost);
//# sourceMappingURL=manufacturing-cost.schema.js.map
