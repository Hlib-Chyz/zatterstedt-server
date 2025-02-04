import { FixedCost } from '@entities/fixed-cost.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class FixedCostSubscriber extends BaseEntitySubscriber<FixedCost> {
    public override listenTo(): typeof FixedCost {
        return FixedCost;
    }
}
