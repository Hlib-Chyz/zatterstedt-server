'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClientSubscriber = void 0;
const tslib_1 = require('tslib');
const client_entity_1 = require('../entities/client.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let ClientSubscriber = class ClientSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return client_entity_1.Client;
    }
};
exports.ClientSubscriber = ClientSubscriber;
exports.ClientSubscriber = ClientSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    ClientSubscriber
);
//# sourceMappingURL=client.subscriber.js.map
