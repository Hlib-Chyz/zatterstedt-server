import { Order } from '@entities/order.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class OrderSubscriber extends BaseEntitySubscriber<Order> {
    listenTo(): typeof Order;
}
