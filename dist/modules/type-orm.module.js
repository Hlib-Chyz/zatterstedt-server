'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ZatterstedtTypeOrmModule = exports.subscribers = exports.entities = void 0;
const tslib_1 = require('tslib');
const log_entity_1 = require('../entities/log.entity');
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const typeorm_1 = require('@nestjs/typeorm');
const additional_cost_entity_1 = require('../entities/additional-cost.entity');
const client_entity_1 = require('../entities/client.entity');
const development_cost_entity_1 = require('../entities/development-cost.entity');
const fixed_cost_entity_1 = require('../entities/fixed-cost.entity');
const inventory_entity_1 = require('../entities/inventory.entity');
const manufacturing_cost_entity_1 = require('../entities/manufacturing-cost.entity');
const order_entity_1 = require('../entities/order.entity');
const other_cost_entity_1 = require('../entities/other-cost.entity');
const product_entity_1 = require('../entities/product.entity');
const stock_entity_1 = require('../entities/stock.entity');
const user_entity_1 = require('../entities/user.entity');
const variant_entity_1 = require('../entities/variant.entity');
const additional_cost_subscriber_1 = require('../subscribers/additional-cost.subscriber');
const client_subscriber_1 = require('../subscribers/client.subscriber');
const development_cost_subscriber_1 = require('../subscribers/development-cost.subscriber');
const fixed_cost_subscriber_1 = require('../subscribers/fixed-cost.subscriber');
const inventory_subscriber_1 = require('../subscribers/inventory.subscriber');
const manufacturing_cost_subscriber_1 = require('../subscribers/manufacturing-cost.subscriber');
const order_subscriber_1 = require('../subscribers/order.subscriber');
const other_cost_subscriber_1 = require('../subscribers/other-cost.subscriber');
const product_subscriber_1 = require('../subscribers/product.subscriber');
const stock_subscriber_1 = require('../subscribers/stock.subscriber');
const user_subscriber_1 = require('../subscribers/user.subscriber');
const variant_subscriber_1 = require('../subscribers/variant.subscriber');
exports.entities = [
    product_entity_1.Product,
    client_entity_1.Client,
    development_cost_entity_1.DevelopmentCost,
    fixed_cost_entity_1.FixedCost,
    other_cost_entity_1.OtherCost,
    user_entity_1.User,
    additional_cost_entity_1.AdditionalCost,
    inventory_entity_1.Inventory,
    variant_entity_1.Variant,
    manufacturing_cost_entity_1.ManufacturingCost,
    stock_entity_1.Stock,
    order_entity_1.Order,
    log_entity_1.Log,
];
exports.subscribers = [
    other_cost_subscriber_1.OtherCostSubscriber,
    additional_cost_subscriber_1.AdditionalCostSubscriber,
    client_subscriber_1.ClientSubscriber,
    development_cost_subscriber_1.DevelopmentCostSubscriber,
    fixed_cost_subscriber_1.FixedCostSubscriber,
    inventory_subscriber_1.InventorySubscriber,
    manufacturing_cost_subscriber_1.ManufacturingCostSubscriber,
    order_subscriber_1.OrderSubscriber,
    product_subscriber_1.ProductSubscriber,
    stock_subscriber_1.StockSubscriber,
    user_subscriber_1.UserSubscriber,
    variant_subscriber_1.VariantSubscriber,
];
let ZatterstedtTypeOrmModule = class ZatterstedtTypeOrmModule {};
exports.ZatterstedtTypeOrmModule = ZatterstedtTypeOrmModule;
exports.ZatterstedtTypeOrmModule = ZatterstedtTypeOrmModule = tslib_1.__decorate(
    [
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        type: 'mongodb',
                        url: configService.get('MONGO_URL') ?? '',
                        database: configService.get('DATABASE_NAME') ?? '',
                        entities: exports.entities,
                        synchronize: true,
                        subscribers: exports.subscribers,
                    }),
                }),
            ],
        }),
    ],
    ZatterstedtTypeOrmModule
);
//# sourceMappingURL=type-orm.module.js.map
