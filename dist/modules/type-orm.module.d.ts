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
)[];
export declare class ZatterstedtTypeOrmModule {}
