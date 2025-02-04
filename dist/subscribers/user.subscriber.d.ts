import { User } from '@entities/user.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class UserSubscriber extends BaseEntitySubscriber<User> {
    listenTo(): typeof User;
}
