'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.FixedCostSubscriber = void 0;
const tslib_1 = require('tslib');
const fixed_cost_entity_1 = require('../entities/fixed-cost.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let FixedCostSubscriber = class FixedCostSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return fixed_cost_entity_1.FixedCost;
    }
};
exports.FixedCostSubscriber = FixedCostSubscriber;
exports.FixedCostSubscriber = FixedCostSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    FixedCostSubscriber
);
//# sourceMappingURL=fixed-cost.subscriber.js.map
