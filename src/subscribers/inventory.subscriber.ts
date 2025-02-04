import { Inventory } from '@entities/inventory.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class InventorySubscriber extends BaseEntitySubscriber<Inventory> {
    public override listenTo(): typeof Inventory {
        return Inventory;
    }
}
