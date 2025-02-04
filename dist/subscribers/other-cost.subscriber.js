'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.OtherCostSubscriber = void 0;
const tslib_1 = require('tslib');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
const other_cost_entity_1 = require('../entities/other-cost.entity');
let OtherCostSubscriber = class OtherCostSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return other_cost_entity_1.OtherCost;
    }
};
exports.OtherCostSubscriber = OtherCostSubscriber;
exports.OtherCostSubscriber = OtherCostSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    OtherCostSubscriber
);
//# sourceMappingURL=other-cost.subscriber.js.map
