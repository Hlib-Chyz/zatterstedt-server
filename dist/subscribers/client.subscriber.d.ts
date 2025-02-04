import { Client } from '@entities/client.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class ClientSubscriber extends BaseEntitySubscriber<Client> {
    listenTo(): typeof Client;
}
