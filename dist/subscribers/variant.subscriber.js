'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.VariantSubscriber = void 0;
const tslib_1 = require('tslib');
const variant_entity_1 = require('../entities/variant.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let VariantSubscriber = class VariantSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return variant_entity_1.Variant;
    }
};
exports.VariantSubscriber = VariantSubscriber;
exports.VariantSubscriber = VariantSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    VariantSubscriber
);
//# sourceMappingURL=variant.subscriber.js.map
