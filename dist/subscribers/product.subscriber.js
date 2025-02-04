'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductSubscriber = void 0;
const tslib_1 = require('tslib');
const product_entity_1 = require('../entities/product.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let ProductSubscriber = class ProductSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return product_entity_1.Product;
    }
};
exports.ProductSubscriber = ProductSubscriber;
exports.ProductSubscriber = ProductSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    ProductSubscriber
);
//# sourceMappingURL=product.subscriber.js.map
