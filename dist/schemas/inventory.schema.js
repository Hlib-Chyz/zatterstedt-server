'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.InventorySchema = exports.Inventory = void 0;
const tslib_1 = require('tslib');
const mongoose_1 = require('@nestjs/mongoose');
const log_helper_1 = require('../helpers/log.helper');
let Inventory = class Inventory {};
exports.Inventory = Inventory;
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
        tslib_1.__metadata('design:type', String),
    ],
    Inventory.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Number, required: true }),
        tslib_1.__metadata('design:type', Number),
    ],
    Inventory.prototype,
    'totalCost',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Number, required: true }),
        tslib_1.__metadata('design:type', Number),
    ],
    Inventory.prototype,
    'amount',
    void 0
);
tslib_1.__decorate(
    [(0, mongoose_1.Prop)({ type: Number, default: 0 }), tslib_1.__metadata('design:type', Number)],
    Inventory.prototype,
    'used',
    void 0
);
tslib_1.__decorate(
    [(0, mongoose_1.Prop)({ type: Number, default: 0 }), tslib_1.__metadata('design:type', Number)],
    Inventory.prototype,
    'paid',
    void 0
);
tslib_1.__decorate(
    [(0, mongoose_1.Prop)({ type: Date, required: true }), tslib_1.__metadata('design:type', Date)],
    Inventory.prototype,
    'date',
    void 0
);
exports.Inventory = Inventory = tslib_1.__decorate([(0, mongoose_1.Schema)()], Inventory);
exports.InventorySchema = mongoose_1.SchemaFactory.createForClass(Inventory);
(0, log_helper_1.log)(exports.InventorySchema, Inventory.name);
//# sourceMappingURL=inventory.schema.js.map
