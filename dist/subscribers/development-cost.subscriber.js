'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DevelopmentCostSubscriber = void 0;
const tslib_1 = require('tslib');
const development_cost_entity_1 = require('../entities/development-cost.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let DevelopmentCostSubscriber = class DevelopmentCostSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return development_cost_entity_1.DevelopmentCost;
    }
};
exports.DevelopmentCostSubscriber = DevelopmentCostSubscriber;
exports.DevelopmentCostSubscriber = DevelopmentCostSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    DevelopmentCostSubscriber
);
//# sourceMappingURL=development-cost.subscriber.js.map
