import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';
import { OtherCost } from '../entities/other-cost.entity';

@EventSubscriber()
export class OtherCostSubscriber extends BaseEntitySubscriber<OtherCost> {
    public override listenTo(): typeof OtherCost {
        return OtherCost;
    }
}
