'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.InventorySubscriber = void 0;
const tslib_1 = require('tslib');
const inventory_entity_1 = require('../entities/inventory.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let InventorySubscriber = class InventorySubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return inventory_entity_1.Inventory;
    }
};
exports.InventorySubscriber = InventorySubscriber;
exports.InventorySubscriber = InventorySubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    InventorySubscriber
);
//# sourceMappingURL=inventory.subscriber.js.map
