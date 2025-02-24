'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
const tslib_1 = require('tslib');
const additional_cost_controller_1 = require('./controllers/additional-cost.controller');
const auth_controller_1 = require('./controllers/auth.controller');
const client_controller_1 = require('./controllers/client.controller');
const development_cost_controller_1 = require('./controllers/development-cost.controller');
const fixed_cost_controller_1 = require('./controllers/fixed-cost.controller');
const inventory_controller_1 = require('./controllers/inventory.controller');
const manufacturing_cost_controller_1 = require('./controllers/manufacturing-cost.controller');
const order_controller_1 = require('./controllers/order.controller');
const other_cost_controller_1 = require('./controllers/other-cost.controller');
const product_controller_1 = require('./controllers/product.controller');
const stock_controller_1 = require('./controllers/stock.controller');
const variant_controller_1 = require('./controllers/variant.controller');
const mongoose_module_1 = require('./modules/mongoose.module');
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const jwt_1 = require('@nestjs/jwt');
const mongoose_1 = require('@nestjs/mongoose');
const additional_cost_service_1 = require('./services/additional-cost.service');
const auth_service_1 = require('./services/auth.service');
const client_service_1 = require('./services/client.service');
const development_cost_service_1 = require('./services/development-cost.service');
const error_service_1 = require('./services/error.service');
const fixed_cost_service_1 = require('./services/fixed-cost.service');
const inventory_service_1 = require('./services/inventory.service');
const log_service_1 = require('./services/log.service');
const manufacturing_cost_service_1 = require('./services/manufacturing-cost.service');
const order_service_1 = require('./services/order.service');
const other_cost_service_1 = require('./services/other-cost.service');
const product_service_1 = require('./services/product.service');
const user_service_1 = require('./services/user.service');
const variant_service_1 = require('./services/variant.service');
const jwt_strategy_1 = require('./strategies/jwt.strategy');
const client_facade_1 = require('./facades/client.facade');
const manufacturing_cost_facade_1 = require('./facades/manufacturing-cost.facade');
const order_facade_1 = require('./facades/order.facade');
const product_facade_1 = require('./facades/product.facade');
const variant_facade_1 = require('./facades/variant.facade');
const logging_hook_1 = require('./hooks/logging.hook');
const mailer_module_1 = require('./modules/mailer.module');
const stock_service_1 = require('./services/stock.service');
let AppModule = class AppModule {};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate(
    [
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true,
                    envFilePath: `.env.${process.env['NODE_ENV'] || 'demo'}`,
                }),
                mongoose_1.MongooseModule.forFeature(mongoose_module_1.schemas),
                mongoose_module_1.ZatterstedtMongooseModule,
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
                variant_controller_1.VariantController,
                product_controller_1.ProductController,
                other_cost_controller_1.OtherCostController,
                order_controller_1.OrderController,
                manufacturing_cost_controller_1.ManufacturingCostController,
                inventory_controller_1.InventoryController,
                fixed_cost_controller_1.FixedCostController,
                development_cost_controller_1.DevelopmentCostController,
                client_controller_1.ClientController,
                auth_controller_1.AuthController,
                additional_cost_controller_1.AdditionalCostController,
                stock_controller_1.StockController,
            ],
            providers: [
                logging_hook_1.LoggingHooks,
                variant_service_1.VariantService,
                stock_service_1.StockService,
                product_service_1.ProductService,
                other_cost_service_1.OtherCostService,
                order_service_1.OrderService,
                manufacturing_cost_service_1.ManufacturingCostService,
                inventory_service_1.InventoryService,
                fixed_cost_service_1.FixedCostService,
                development_cost_service_1.DevelopmentCostService,
                client_service_1.ClientService,
                auth_service_1.AuthService,
                user_service_1.UserService,
                jwt_strategy_1.JwtStrategy,
                additional_cost_service_1.AdditionalCostService,
                error_service_1.ErrorService,
                product_facade_1.ProductFacade,
                manufacturing_cost_facade_1.ManufacturingCostFacade,
                order_facade_1.OrderFacade,
                client_facade_1.ClientFacade,
                variant_facade_1.VariantFacade,
                log_service_1.LogService,
            ],
        }),
    ],
    AppModule
);
//# sourceMappingURL=app.module.js.map
