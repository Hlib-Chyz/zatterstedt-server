import { User } from '@entities/user.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class UserSubscriber extends BaseEntitySubscriber<User> {
    public override listenTo(): typeof User {
        return User;
    }
}
