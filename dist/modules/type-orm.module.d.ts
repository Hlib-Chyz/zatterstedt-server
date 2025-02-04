import { Log } from '@entities/log.entity';
import { AdditionalCost } from 'src/entities/additional-cost.entity';
import { Client } from 'src/entities/client.entity';
import { FixedCost } from 'src/entities/fixed-cost.entity';
import { Inventory } from 'src/entities/inventory.entity';
import { ManufacturingCost } from 'src/entities/manufacturing-cost.entity';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { Stock } from 'src/entities/stock.entity';
import { User } from 'src/entities/user.entity';
import { Variant } from 'src/entities/variant.entity';
import { AdditionalCostSubscriber } from 'src/subscribers/additional-cost.subscriber';
import { ClientSubscriber } from 'src/subscribers/client.subscriber';
import { FixedCostSubscriber } from 'src/subscribers/fixed-cost.subscriber';
import { InventorySubscriber } from 'src/subscribers/inventory.subscriber';
import { ManufacturingCostSubscriber } from 'src/subscribers/manufacturing-cost.subscriber';
import { OrderSubscriber } from 'src/subscribers/order.subscriber';
import { ProductSubscriber } from 'src/subscribers/product.subscriber';
import { StockSubscriber } from 'src/subscribers/stock.subscriber';
import { UserSubscriber } from 'src/subscribers/user.subscriber';
import { VariantSubscriber } from 'src/subscribers/variant.subscriber';
export declare const entities: (
    | typeof AdditionalCost
    | typeof User
    | typeof Client
    | typeof Order
    | typeof Product
    | typeof Stock
    | typeof Variant
    | typeof FixedCost
    | typeof Inventory
    | typeof ManufacturingCost
    | typeof Log
)[];
export declare const subscribers: (
    | typeof AdditionalCostSubscriber
    | typeof ClientSubscriber
    | typeof FixedCostSubscriber
    | typeof InventorySubscriber
    | typeof ManufacturingCostSubscriber
    | typeof OrderSubscriber
    | typeof ProductSubscriber
    | typeof StockSubscriber
    | typeof UserSubscriber
    | typeof VariantSubscriber
)[];
export declare class ZatterstedtTypeOrmModule {}
