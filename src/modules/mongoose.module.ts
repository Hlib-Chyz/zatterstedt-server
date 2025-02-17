import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdditionalCost, AdditionalCostSchema } from 'src/schemas/additional-cost.schema';
import { Client, ClientSchema } from 'src/schemas/client.schema';
import { DevelopmentCost, DevelopmentCostSchema } from 'src/schemas/development-cost.schema';
import { FixedCost, FixedCostSchema } from 'src/schemas/fixed-cost.schema';
import { Inventory, InventorySchema } from 'src/schemas/inventory.schema';
import { Log, LogSchema } from 'src/schemas/log.schema';
import { ManufacturingCost, ManufacturingCostSchema } from 'src/schemas/manufacturing-cost.schema';
import { Order, OrderSchema } from 'src/schemas/order.schema';
import { OtherCost, OtherCostSchema } from 'src/schemas/other-cost.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { Stock, StockSchema } from 'src/schemas/stock.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Variant, VariantSchema } from 'src/schemas/variant.schema';

export const schemas = [
    { name: Product.name, schema: ProductSchema },
    { name: Client.name, schema: ClientSchema },
    { name: DevelopmentCost.name, schema: DevelopmentCostSchema },
    { name: FixedCost.name, schema: FixedCostSchema },
    { name: OtherCost.name, schema: OtherCostSchema },
    { name: User.name, schema: UserSchema },
    { name: AdditionalCost.name, schema: AdditionalCostSchema },
    { name: Inventory.name, schema: InventorySchema },
    { name: Variant.name, schema: VariantSchema },
    { name: ManufacturingCost.name, schema: ManufacturingCostSchema },
    { name: Stock.name, schema: StockSchema },
    { name: Order.name, schema: OrderSchema },
    { name: Log.name, schema: LogSchema },
];

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URL') ?? '',
                dbName: configService.get<string>('DATABASE_NAME') ?? '',
            }),
        }),
    ],
})
export class ZatterstedtMongooseModule {}
