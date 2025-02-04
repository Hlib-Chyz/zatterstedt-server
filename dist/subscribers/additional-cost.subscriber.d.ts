import { AdditionalCost } from '@entities/additional-cost.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class AdditionalCostSubscriber extends BaseEntitySubscriber<AdditionalCost> {
    listenTo(): typeof AdditionalCost;
}
