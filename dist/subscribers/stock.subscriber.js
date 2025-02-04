'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.StockSubscriber = void 0;
const tslib_1 = require('tslib');
const stock_entity_1 = require('../entities/stock.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let StockSubscriber = class StockSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return stock_entity_1.Stock;
    }
};
exports.StockSubscriber = StockSubscriber;
exports.StockSubscriber = StockSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    StockSubscriber
);
//# sourceMappingURL=stock.subscriber.js.map
