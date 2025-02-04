import { DevelopmentCost } from '@entities/development-cost.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class DevelopmentCostSubscriber extends BaseEntitySubscriber<DevelopmentCost> {
    listenTo(): typeof DevelopmentCost;
}
