'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VariantSchema = exports.Variant = void 0;
const tslib_1 = require('tslib');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const log_helper_1 = require('../helpers/log.helper');
const product_schema_1 = require('./product.schema');
let Variant = class Variant {};
exports.Variant = Variant;
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: String, required: true }),
        tslib_1.__metadata('design:type', String),
    ],
    Variant.prototype,
    'color',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: String, required: true }),
        tslib_1.__metadata('design:type', String),
    ],
    Variant.prototype,
    'size',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({
            type: mongoose_2.Types.ObjectId,
            required: true,
            ref: product_schema_1.Product.name,
        }),
        tslib_1.__metadata('design:type', mongoose_2.Types.ObjectId),
    ],
    Variant.prototype,
    'productId',
    void 0
);
exports.Variant = Variant = tslib_1.__decorate([(0, mongoose_1.Schema)()], Variant);
exports.VariantSchema = mongoose_1.SchemaFactory.createForClass(Variant);
exports.VariantSchema.index({ color: 1, size: 1, productId: 1 }, { unique: true });
(0, log_helper_1.log)(exports.VariantSchema, Variant.name);
//# sourceMappingURL=variant.schema.js.map
