'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AdditionalCostSubscriber = void 0;
const tslib_1 = require('tslib');
const additional_cost_entity_1 = require('../entities/additional-cost.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let AdditionalCostSubscriber = class AdditionalCostSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return additional_cost_entity_1.AdditionalCost;
    }
};
exports.AdditionalCostSubscriber = AdditionalCostSubscriber;
exports.AdditionalCostSubscriber = AdditionalCostSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    AdditionalCostSubscriber
);
//# sourceMappingURL=additional-cost.subscriber.js.map
