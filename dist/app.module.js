'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
const tslib_1 = require('tslib');
const additional_costs_controller_1 = require('./controllers/additional-costs.controller');
const auth_controller_1 = require('./controllers/auth.controller');
const clients_controller_1 = require('./controllers/clients.controller');
const development_costs_controller_1 = require('./controllers/development-costs.controller');
const fixed_costs_controller_1 = require('./controllers/fixed-costs.controller');
const inventory_controller_1 = require('./controllers/inventory.controller');
const manufacturing_costs_controller_1 = require('./controllers/manufacturing-costs.controller');
const orders_controller_1 = require('./controllers/orders.controller');
const other_costs_controller_1 = require('./controllers/other-costs.controller');
const products_controller_1 = require('./controllers/products.controller');
const stock_controller_1 = require('./controllers/stock.controller');
const variants_controller_1 = require('./controllers/variants.controller');
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const jwt_1 = require('@nestjs/jwt');
const typeorm_1 = require('@nestjs/typeorm');
const additional_costs_service_1 = require('./services/additional-costs.service');
const auth_service_1 = require('./services/auth.service');
const clients_service_1 = require('./services/clients.service');
const development_costs_service_1 = require('./services/development-costs.service');
const error_service_1 = require('./services/error.service');
const fixed_costs_service_1 = require('./services/fixed-costs.service');
const inventory_service_1 = require('./services/inventory.service');
const manufacturing_costs_service_1 = require('./services/manufacturing-costs.service');
const orders_service_1 = require('./services/orders.service');
const other_costs_service_1 = require('./services/other-costs.service');
const products_service_1 = require('./services/products.service');
const user_service_1 = require('./services/user.service');
const variants_service_1 = require('./services/variants.service');
const jwt_strategy_1 = require('./strategies/jwt.strategy');
const mailer_module_1 = require('./modules/mailer.module');
const type_orm_module_1 = require('./modules/type-orm.module');
const stock_service_1 = require('./services/stock.service');
let AppModule = class AppModule {};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate(
    [
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                }),
                typeorm_1.TypeOrmModule.forFeature(type_orm_module_1.entities),
                type_orm_module_1.ZatterstedtTypeOrmModule,
                jwt_1.JwtModule.registerAsync({
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        secret: configService.get('JWT_SECRET') ?? '',
                        signOptions: { expiresIn: '24h' },
                    }),
                }),
                mailer_module_1.ZatterstedtMailerModule,
            ],
            controllers: [
                variants_controller_1.VariantsController,
                products_controller_1.ProductsController,
                other_costs_controller_1.OtherCostsController,
                orders_controller_1.OrdersController,
                manufacturing_costs_controller_1.ManufacturingCostsController,
                inventory_controller_1.InventoryController,
                fixed_costs_controller_1.FixedCostsController,
                development_costs_controller_1.DevelopmentCostsController,
                clients_controller_1.ClientsController,
                auth_controller_1.AuthController,
                additional_costs_controller_1.AdditionalCostsController,
                stock_controller_1.StockController,
            ],
            providers: [
                variants_service_1.VariantsService,
                stock_service_1.StockService,
                products_service_1.ProductsService,
                other_costs_service_1.OtherCostsService,
                orders_service_1.OrdersService,
                manufacturing_costs_service_1.ManufacturingCostsService,
                inventory_service_1.InventoryService,
                fixed_costs_service_1.FixedCostsService,
                development_costs_service_1.DevelopmentCostsService,
                clients_service_1.ClientsService,
                auth_service_1.AuthService,
                user_service_1.UserService,
                jwt_strategy_1.JwtStrategy,
                additional_costs_service_1.AdditionalCostsService,
                error_service_1.ErrorService,
            ],
        }),
    ],
    AppModule
);
//# sourceMappingURL=app.module.js.map
