'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserSubscriber = void 0;
const tslib_1 = require('tslib');
const user_entity_1 = require('../entities/user.entity');
const base_entity_subscriber_1 = require('./base-entity.subscriber');
const typeorm_1 = require('typeorm');
let UserSubscriber = class UserSubscriber extends base_entity_subscriber_1.BaseEntitySubscriber {
    listenTo() {
        return user_entity_1.User;
    }
};
exports.UserSubscriber = UserSubscriber;
exports.UserSubscriber = UserSubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    UserSubscriber
);
//# sourceMappingURL=user.subscriber.js.map
