import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    ObjectId,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm';
import { Log } from '../entities/log.entity';

@EventSubscriber()
export abstract class BaseEntitySubscriber<T extends { _id: ObjectId }>
    implements EntitySubscriberInterface<T>
{
    public async afterInsert(event: InsertEvent<T>): Promise<void> {
        if (!event.entity) {
            return;
        }
        const logRepo = event.manager.getRepository(Log);
        await logRepo.save({
            operation: 'create',
            collection: this.getCollectionName(),
            documentId: event.entity._id.toString(),
            newData: event.entity,
        });
    }

    public async beforeUpdate(event: UpdateEvent<T>): Promise<void> {
        if (!event.databaseEntity || !event.entity) {
            return;
        }
        const logRepo = event.manager.getRepository(Log);
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

    public async beforeRemove(event: RemoveEvent<T>): Promise<void> {
        if (!event.entity) {
            return;
        }
        const logRepo = event.manager.getRepository(Log);
        await logRepo.save({
            operation: 'delete',
            collection: this.getCollectionName(),
            documentId: event.entity._id.toString(),
            oldData: event.entity,
        });
    }

    private getCollectionName(): string {
        return this.listenTo().name.toLowerCase();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public abstract listenTo(): any;
}
