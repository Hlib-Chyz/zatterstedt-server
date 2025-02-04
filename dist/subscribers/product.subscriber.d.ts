import { Product } from '@entities/product.entity';
import { BaseEntitySubscriber } from 'src/subscribers/base-entity.subscriber';
export declare class ProductSubscriber extends BaseEntitySubscriber<Product> {
    listenTo(): typeof Product;
}
