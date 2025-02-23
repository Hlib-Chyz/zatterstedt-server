'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FixedCostSchema = exports.FixedCost = void 0;
const tslib_1 = require('tslib');
const mongoose_1 = require('@nestjs/mongoose');
let FixedCost = class FixedCost {};
exports.FixedCost = FixedCost;
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
        tslib_1.__metadata('design:type', String),
    ],
    FixedCost.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Number, required: true }),
        tslib_1.__metadata('design:type', Number),
    ],
    FixedCost.prototype,
    'cost',
    void 0
);
exports.FixedCost = FixedCost = tslib_1.__decorate(
    [(0, mongoose_1.Schema)({ collection: 'fixed_costs' })],
    FixedCost
);
exports.FixedCostSchema = mongoose_1.SchemaFactory.createForClass(FixedCost);
//# sourceMappingURL=fixed-cost.schema.js.map
