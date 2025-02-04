import { AdditionalCostsController } from '@controllers/additional-costs.controller';
import { AuthController } from '@controllers/auth.controller';
import { ClientsController } from '@controllers/clients.controller';
import { DevelopmentCostsController } from '@controllers/development-costs.controller';
import { FixedCostsController } from '@controllers/fixed-costs.controller';
import { InventoryController } from '@controllers/inventory.controller';
import { ManufacturingCostsController } from '@controllers/manufacturing-costs.controller';
import { OrdersController } from '@controllers/orders.controller';
import { OtherCostsController } from '@controllers/other-costs.controller';
import { ProductsController } from '@controllers/products.controller';
import { StockController } from '@controllers/stock.controller';
import { VariantsController } from '@controllers/variants.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalCostsService } from '@services/additional-costs.service';
import { AuthService } from '@services/auth.service';
import { ClientsService } from '@services/clients.service';
import { DevelopmentCostsService } from '@services/development-costs.service';
import { ErrorService } from '@services/error.service';
import { FixedCostsService } from '@services/fixed-costs.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostsService } from '@services/manufacturing-costs.service';
import { OrdersService } from '@services/orders.service';
import { OtherCostsService } from '@services/other-costs.service';
import { ProductsService } from '@services/products.service';
import { UserService } from '@services/user.service';
import { VariantsService } from '@services/variants.service';
import { JwtStrategy } from '@strategies/jwt.strategy';
import { ClientFacade } from 'src/facades/client.facade';
import { ManufacturingCostFacade } from 'src/facades/manufacturing-cost.facade';
import { OrderFacade } from 'src/facades/order.facade';
import { ProductFacade } from 'src/facades/product.facade';
import { VariantFacade } from 'src/facades/variant.facade';
import { ZatterstedtMailerModule } from './modules/mailer.module';
import { entities, subscribers, ZatterstedtTypeOrmModule } from './modules/type-orm.module';
import { StockService } from './services/stock.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env['NODE_ENV'] || 'demo'}`,
        }),
        TypeOrmModule.forFeature(entities),
        ZatterstedtTypeOrmModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') ?? '',
                signOptions: { expiresIn: '24h' },
            }),
        }),
        ZatterstedtMailerModule,
    ],
    controllers: [
        VariantsController,
        ProductsController,
        OtherCostsController,
        OrdersController,
        ManufacturingCostsController,
        InventoryController,
        FixedCostsController,
        DevelopmentCostsController,
        ClientsController,
        AuthController,
        AdditionalCostsController,
        StockController,
    ],
    providers: [
        VariantsService,
        StockService,
        ProductsService,
        OtherCostsService,
        OrdersService,
        ManufacturingCostsService,
        InventoryService,
        FixedCostsService,
        DevelopmentCostsService,
        ClientsService,
        AuthService,
        UserService,
        JwtStrategy,
        AdditionalCostsService,
        ErrorService,
        ProductFacade,
        ManufacturingCostFacade,
        OrderFacade,
        ClientFacade,
        VariantFacade,
        ...subscribers,
    ],
})
export class AppModule {}
