'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ManufacturingCostSubscriber = void 0;
const tslib_1 = require('tslib');
const manufacturing_cost_entity_1 = require('../entities/manufacturing-cost.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let ManufacturingCostSubscriber = class ManufacturingCostSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return manufacturing_cost_entity_1.ManufacturingCost;
    }
};
exports.ManufacturingCostSubscriber = ManufacturingCostSubscriber;
exports.ManufacturingCostSubscriber = ManufacturingCostSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    ManufacturingCostSubscriber
);
//# sourceMappingURL=manufacturing-cost.subscriber.js.map
