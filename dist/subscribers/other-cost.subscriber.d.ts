import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { OtherCost } from '../entities/other-cost.entity';
export declare class OtherCostSubscriber extends BaseEntitySubscriber<OtherCost> {
    listenTo(): typeof OtherCost;
}
