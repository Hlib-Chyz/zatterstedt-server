"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZatterstedtMongooseModule = exports.schemas = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const additional_cost_schema_1 = require("../schemas/additional-cost.schema");
const client_schema_1 = require("../schemas/client.schema");
const development_cost_schema_1 = require("../schemas/development-cost.schema");
const fixed_cost_schema_1 = require("../schemas/fixed-cost.schema");
const inventory_schema_1 = require("../schemas/inventory.schema");
const log_schema_1 = require("../schemas/log.schema");
const manufacturing_cost_schema_1 = require("../schemas/manufacturing-cost.schema");
const order_schema_1 = require("../schemas/order.schema");
const other_cost_schema_1 = require("../schemas/other-cost.schema");
const product_schema_1 = require("../schemas/product.schema");
const stock_schema_1 = require("../schemas/stock.schema");
const user_schema_1 = require("../schemas/user.schema");
const variant_schema_1 = require("../schemas/variant.schema");
exports.schemas = [
    { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
    { name: client_schema_1.Client.name, schema: client_schema_1.ClientSchema },
    { name: development_cost_schema_1.DevelopmentCost.name, schema: development_cost_schema_1.DevelopmentCostSchema },
    { name: fixed_cost_schema_1.FixedCost.name, schema: fixed_cost_schema_1.FixedCostSchema },
    { name: other_cost_schema_1.OtherCost.name, schema: other_cost_schema_1.OtherCostSchema },
    { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
    { name: additional_cost_schema_1.AdditionalCost.name, schema: additional_cost_schema_1.AdditionalCostSchema },
    { name: inventory_schema_1.Inventory.name, schema: inventory_schema_1.InventorySchema },
    { name: variant_schema_1.Variant.name, schema: variant_schema_1.VariantSchema },
    { name: manufacturing_cost_schema_1.ManufacturingCost.name, schema: manufacturing_cost_schema_1.ManufacturingCostSchema },
    { name: stock_schema_1.Stock.name, schema: stock_schema_1.StockSchema },
    { name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema },
    { name: log_schema_1.Log.name, schema: log_schema_1.LogSchema },
];
let ZatterstedtMongooseModule = class ZatterstedtMongooseModule {
};
exports.ZatterstedtMongooseModule = ZatterstedtMongooseModule;
exports.ZatterstedtMongooseModule = ZatterstedtMongooseModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    uri: configService.get('MONGO_URL') ?? '',
                    dbName: configService.get('DATABASE_NAME') ?? '',
                }),
            }),
        ],
    })
], ZatterstedtMongooseModule);
//# sourceMappingURL=mongoose.module.js.map