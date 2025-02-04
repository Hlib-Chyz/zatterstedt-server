import { Stock } from '@entities/stock.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class StockSubscriber extends BaseEntitySubscriber<Stock> {
    listenTo(): typeof Stock;
}
