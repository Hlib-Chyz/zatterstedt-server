import { ManufacturingCost } from '@entities/manufacturing-cost.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class ManufacturingCostSubscriber extends BaseEntitySubscriber<ManufacturingCost> {
    public override listenTo(): typeof ManufacturingCost {
        return ManufacturingCost;
    }
}
