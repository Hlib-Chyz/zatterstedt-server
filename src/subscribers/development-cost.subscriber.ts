import { DevelopmentCost } from '@entities/development-cost.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class DevelopmentCostSubscriber extends BaseEntitySubscriber<DevelopmentCost> {
    public override listenTo(): typeof DevelopmentCost {
        return DevelopmentCost;
    }
}
