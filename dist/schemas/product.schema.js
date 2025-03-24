'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductSchema = exports.Product = void 0;
const tslib_1 = require('tslib');
const mongoose_1 = require('@nestjs/mongoose');
const log_helper_1 = require('../helpers/log.helper');
let Product = class Product {};
exports.Product = Product;
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
        tslib_1.__metadata('design:type', String),
    ],
    Product.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: Number, required: true }),
        tslib_1.__metadata('design:type', Number),
    ],
    Product.prototype,
    'price',
    void 0
);
exports.Product = Product = tslib_1.__decorate([(0, mongoose_1.Schema)()], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
(0, log_helper_1.log)(exports.ProductSchema, Product.name);
//# sourceMappingURL=product.schema.js.map
