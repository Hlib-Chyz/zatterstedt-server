import { AdditionalCost } from '@entities/additional-cost.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class AdditionalCostSubscriber extends BaseEntitySubscriber<AdditionalCost> {
    public override listenTo(): typeof AdditionalCost {
        return AdditionalCost;
    }
}
