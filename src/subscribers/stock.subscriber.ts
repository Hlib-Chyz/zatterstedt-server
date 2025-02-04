import { Stock } from '@entities/stock.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class StockSubscriber extends BaseEntitySubscriber<Stock> {
    public override listenTo(): typeof Stock {
        return Stock;
    }
}
