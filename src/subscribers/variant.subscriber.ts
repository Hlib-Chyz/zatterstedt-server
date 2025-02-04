import { Variant } from '@entities/variant.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class VariantSubscriber extends BaseEntitySubscriber<Variant> {
    public override listenTo(): typeof Variant {
        return Variant;
    }
}
