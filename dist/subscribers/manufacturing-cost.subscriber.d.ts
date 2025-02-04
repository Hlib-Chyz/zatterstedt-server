import { ManufacturingCost } from '@entities/manufacturing-cost.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class ManufacturingCostSubscriber extends BaseEntitySubscriber<ManufacturingCost> {
    listenTo(): typeof ManufacturingCost;
}
