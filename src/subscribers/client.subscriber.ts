import { Client } from '@entities/client.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class ClientSubscriber extends BaseEntitySubscriber<Client> {
    public override listenTo(): typeof Client {
        return Client;
    }
}
