'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OrderSubscriber = void 0;
const tslib_1 = require('tslib');
const order_entity_1 = require('../entities/order.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let OrderSubscriber = class OrderSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return order_entity_1.Order;
    }
};
exports.OrderSubscriber = OrderSubscriber;
exports.OrderSubscriber = OrderSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    OrderSubscriber
);
//# sourceMappingURL=order.subscriber.js.map
