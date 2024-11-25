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
];

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mongodb',
                url: configService.get<string>('MONGO_URL')!,
                database: configService.get<string>('DATABASE_NAME')!,
                entities,
                synchronize: true,
            }),
        }),
    ],
})
export class ZatterstedtTypeOrmModule {}
