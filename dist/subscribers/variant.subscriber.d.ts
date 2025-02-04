import { Variant } from '@entities/variant.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class VariantSubscriber extends BaseEntitySubscriber<Variant> {
    listenTo(): typeof Variant;
}
