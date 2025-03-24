import { AuthController } from '@controllers/auth.controller';
import { ClientController } from '@controllers/client.controller';
import { DevelopmentCostController } from '@controllers/development-cost.controller';
import { InventoryController } from '@controllers/inventory.controller';
import { ManufacturingCostController } from '@controllers/manufacturing-cost.controller';
import { OrderController } from '@controllers/order.controller';
import { ProductController } from '@controllers/product.controller';
import { StockController } from '@controllers/stock.controller';
import { VariantController } from '@controllers/variant.controller';
import { schemas, ZatterstedtMongooseModule } from '@modules/mongoose.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '@services/auth.service';
import { ClientService } from '@services/client.service';
import { DevelopmentCostService } from '@services/development-cost.service';
import { ErrorService } from '@services/error.service';
import { InventoryService } from '@services/inventory.service';
import { ManufacturingCostService } from '@services/manufacturing-cost.service';
import { OrderService } from '@services/order.service';
import { ProductService } from '@services/product.service';
import { UserService } from '@services/user.service';
import { VariantService } from '@services/variant.service';
import { JwtStrategy } from '@strategies/jwt.strategy';
import { ClientFacade } from 'src/facades/client.facade';
import { ManufacturingCostFacade } from 'src/facades/manufacturing-cost.facade';
import { OrderFacade } from 'src/facades/order.facade';
import { ProductFacade } from 'src/facades/product.facade';
import { VariantFacade } from 'src/facades/variant.facade';
import { ZatterstedtMailerModule } from './modules/mailer.module';
import { StockService } from './services/stock.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env['NODE_ENV'] || 'demo'}`,
        }),
        MongooseModule.forFeature(schemas),
        ZatterstedtMongooseModule,
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
        VariantController,
        ProductController,
        OrderController,
        ManufacturingCostController,
        InventoryController,
        DevelopmentCostController,
        ClientController,
        AuthController,
        StockController,
    ],
    providers: [
        VariantService,
        StockService,
        ProductService,
        OrderService,
        ManufacturingCostService,
        InventoryService,
        DevelopmentCostService,
        ClientService,
        AuthService,
        UserService,
        JwtStrategy,
        ErrorService,
        ProductFacade,
        ManufacturingCostFacade,
        OrderFacade,
        ClientFacade,
        VariantFacade,
    ],
})
export class AppModule {}
