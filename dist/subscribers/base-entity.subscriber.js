'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BaseEntitySubscriber = void 0;
const tslib_1 = require('tslib');
const typeorm_1 = require('typeorm');
const log_entity_1 = require('../entities/log.entity');
let BaseEntitySubscriber = class BaseEntitySubscriber {
    async afterInsert(event) {
        if (!event.entity) {
            return;
        }
        const logRepo = event.manager.getRepository(log_entity_1.Log);
        await logRepo.save({
            operation: 'create',
            collection: this.getCollectionName(),
            documentId: event.entity._id.toString(),
            newData: event.entity,
        });
    }
    async beforeUpdate(event) {
        if (!event.databaseEntity || !event.entity) {
            return;
        }
        const logRepo = event.manager.getRepository(log_entity_1.Log);
        const oldEntity = await event.manager
            .getRepository(this.listenTo())
            .findOneBy({ _id: event.databaseEntity._id });
        await logRepo.save({
            operation: 'update',
            collection: this.getCollectionName(),
            documentId: event.databaseEntity._id.toString(),
            oldData: oldEntity,
            newData: event.entity,
        });
    }
    async beforeRemove(event) {
        if (!event.entity) {
            return;
        }
        const logRepo = event.manager.getRepository(log_entity_1.Log);
        await logRepo.save({
            operation: 'delete',
            collection: this.getCollectionName(),
            documentId: event.entity._id.toString(),
            oldData: event.entity,
        });
    }
    getCollectionName() {
        return this.listenTo().name.toLowerCase();
    }
};
exports.BaseEntitySubscriber = BaseEntitySubscriber;
exports.BaseEntitySubscriber = BaseEntitySubscriber = tslib_1.__decorate(
    [(0, typeorm_1.EventSubscriber)()],
    BaseEntitySubscriber
);
//# sourceMappingURL=base-entity.subscriber.js.map
