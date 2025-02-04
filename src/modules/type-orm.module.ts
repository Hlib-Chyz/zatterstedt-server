import { Log } from '@entities/log.entity';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalCost } from 'src/entities/additional-cost.entity';
import { Client } from 'src/entities/client.entity';
import { DevelopmentCost } from 'src/entities/development-cost.entity';
import { FixedCost } from 'src/entities/fixed-cost.entity';
import { Inventory } from 'src/entities/inventory.entity';
import { ManufacturingCost } from 'src/entities/manufacturing-cost.entity';
import { Order } from 'src/entities/order.entity';
import { OtherCost } from 'src/entities/other-cost.entity';
import { Product } from 'src/entities/product.entity';
import { Stock } from 'src/entities/stock.entity';
import { User } from 'src/entities/user.entity';
import { Variant } from 'src/entities/variant.entity';
import { AdditionalCostSubscriber } from 'src/subscribers/additional-cost.subscriber';
import { ClientSubscriber } from 'src/subscribers/client.subscriber';
import { DevelopmentCostSubscriber } from 'src/subscribers/development-cost.subscriber';
import { FixedCostSubscriber } from 'src/subscribers/fixed-cost.subscriber';
import { InventorySubscriber } from 'src/subscribers/inventory.subscriber';
import { ManufacturingCostSubscriber } from 'src/subscribers/manufacturing-cost.subscriber';
import { OrderSubscriber } from 'src/subscribers/order.subscriber';
import { OtherCostSubscriber } from 'src/subscribers/other-cost.subscriber';
import { ProductSubscriber } from 'src/subscribers/product.subscriber';
import { StockSubscriber } from 'src/subscribers/stock.subscriber';
import { UserSubscriber } from 'src/subscribers/user.subscriber';
import { VariantSubscriber } from 'src/subscribers/variant.subscriber';

export const entities = [
    Product,
    Client,
    DevelopmentCost,
    FixedCost,
    OtherCost,
    User,
    AdditionalCost,
    Inventory,
    Variant,
    ManufacturingCost,
    Stock,
    Order,
    Log,
];

export const subscribers = [
    OtherCostSubscriber,
    AdditionalCostSubscriber,
    ClientSubscriber,
    DevelopmentCostSubscriber,
    FixedCostSubscriber,
    InventorySubscriber,
    ManufacturingCostSubscriber,
    OrderSubscriber,
    ProductSubscriber,
    StockSubscriber,
    UserSubscriber,
    VariantSubscriber,
];

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mongodb',
                url: configService.get<string>('MONGO_URL') ?? '',
                database: configService.get<string>('DATABASE_NAME') ?? '',
                entities,
                synchronize: true,
                subscribers,
            }),
        }),
    ],
})
export class ZatterstedtTypeOrmModule {}
