import { Order } from '@entities/order.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class OrderSubscriber extends BaseEntitySubscriber<Order> {
    public override listenTo(): typeof Order {
        return Order;
    }
}
