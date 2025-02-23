'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OtherCostSchema = exports.OtherCost = void 0;
const tslib_1 = require('tslib');
const mongoose_1 = require('@nestjs/mongoose');
let OtherCost = class OtherCost {};
exports.OtherCost = OtherCost;
tslib_1.__decorate(
    [(0, mongoose_1.Prop)({ type: Date, required: true }), tslib_1.__metadata('design:type', Date)],
    OtherCost.prototype,
    'date',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: String, required: true }),
        tslib_1.__metadata('design:type', String),
    ],
    OtherCost.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Number, required: true }),
        tslib_1.__metadata('design:type', Number),
    ],
    OtherCost.prototype,
    'cost',
    void 0
);
exports.OtherCost = OtherCost = tslib_1.__decorate(
    [(0, mongoose_1.Schema)({ collection: 'other_costs' })],
    OtherCost
);
exports.OtherCostSchema = mongoose_1.SchemaFactory.createForClass(OtherCost);
//# sourceMappingURL=other-cost.schema.js.map
