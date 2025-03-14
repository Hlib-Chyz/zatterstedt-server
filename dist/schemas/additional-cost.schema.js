'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdditionalCostSchema = exports.AdditionalCost = void 0;
const tslib_1 = require('tslib');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const log_helper_1 = require('../helpers/log.helper');
const product_schema_1 = require('./product.schema');
let AdditionalCost = class AdditionalCost {};
exports.AdditionalCost = AdditionalCost;
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({
            type: mongoose_2.Types.ObjectId,
            ref: product_schema_1.Product.name,
            required: true,
            unique: true,
        }),
        tslib_1.__metadata('design:type', mongoose_2.Types.ObjectId),
    ],
    AdditionalCost.prototype,
    'productId',
    void 0
);
tslib_1.__decorate(
    [(0, mongoose_1.Prop)({ type: Number, default: 0 }), tslib_1.__metadata('design:type', Number)],
    AdditionalCost.prototype,
    'cost',
    void 0
);
exports.AdditionalCost = AdditionalCost = tslib_1.__decorate(
    [(0, mongoose_1.Schema)({ collection: 'additional_costs' })],
    AdditionalCost
);
exports.AdditionalCostSchema = mongoose_1.SchemaFactory.createForClass(AdditionalCost);
(0, log_helper_1.log)(exports.AdditionalCostSchema, AdditionalCost.name);
//# sourceMappingURL=additional-cost.schema.js.map
