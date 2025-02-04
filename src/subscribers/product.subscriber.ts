import { Product } from '@entities/product.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
import { EventSubscriber } from 'typeorm';

@EventSubscriber()
export class ProductSubscriber extends BaseEntitySubscriber<Product> {
    public override listenTo(): typeof Product {
        return Product;
    }
}
