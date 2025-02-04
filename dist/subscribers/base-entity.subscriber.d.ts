import {
    EntitySubscriberInterface,
    InsertEvent,
    ObjectId,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm';
export declare abstract class BaseEntitySubscriber<
    T extends {
        _id: ObjectId;
    },
> implements EntitySubscriberInterface<T>
{
    afterInsert(event: InsertEvent<T>): Promise<void>;
    beforeUpdate(event: UpdateEvent<T>): Promise<void>;
    beforeRemove(event: RemoveEvent<T>): Promise<void>;
    private getCollectionName;
    abstract listenTo(): any;
}
