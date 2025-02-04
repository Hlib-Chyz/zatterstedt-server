import { FixedCost } from '@entities/fixed-cost.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class FixedCostSubscriber extends BaseEntitySubscriber<FixedCost> {
    listenTo(): typeof FixedCost;
}
