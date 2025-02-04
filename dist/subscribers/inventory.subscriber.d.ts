import { Inventory } from '@entities/inventory.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class InventorySubscriber extends BaseEntitySubscriber<Inventory> {
    listenTo(): typeof Inventory;
}
