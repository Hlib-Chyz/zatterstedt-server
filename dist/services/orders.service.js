"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const tslib_1 = require("tslib");
const manufacturing_cost_entity_1 = require("../entities/manufacturing-cost.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../entities/order.entity");
const typeorm_2 = require("typeorm");
const clients_service_1 = require("./clients.service");
const error_service_1 = require("./error.service");
const inventory_service_1 = require("./inventory.service");
const stock_service_1 = require("./stock.service");
const variants_service_1 = require("./variants.service");
let OrdersService = class OrdersService {
    constructor(ordersRepository, manufacturingCostsRepository, errorService, stockService, inventoryService, clientsService, variantsService) {
        this.ordersRepository = ordersRepository;
        this.manufacturingCostsRepository = manufacturingCostsRepository;
        this.errorService = errorService;
        this.stockService = stockService;
        this.inventoryService = inventoryService;
        this.clientsService = clientsService;
        this.variantsService = variantsService;
    }
    async getAll() {
        try {
            const orders = await this.ordersRepository.find();
            const res = [];
            for (const order of orders) {
                const client = await this.clientsService.getByClientId(order.clientId);
                const resVariant = [];
                for (const variant of order.variants) {
                    resVariant.push(`${await this.variantsService.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`);
                }
                res.push({
                    _id: order._id,
                    date: order.date,
                    client: `${client.name} - ${client.contacts}`,
                    variants: resVariant,
                    orderNumber: order.orderNumber,
                });
            }
            return res;
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get orders');
            return [];
        }
    }
    async getByVariantId(variantId) {
        try {
            const mongoRepository = this.ordersRepository;
            return await mongoRepository.find({
                where: {
                    variants: { $elemMatch: { _id: variantId } },
                },
            });
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get orders by variant id');
            return [];
        }
    }
    async add(order) {
        try {
            let clientId = '';
            if (!order.clientId) {
                clientId = (await this.clientsService.add({
                    name: order.clientName,
                    contacts: order.contacts,
                })).toString();
            }
            for (const variant of order.variants) {
                const productId = await this.variantsService.getProductId(variant._id);
                const manufacturingCost = await this.manufacturingCostsRepository.findOne({
                    where: { productId },
                });
                for (const inventory of manufacturingCost?.inventory ?? []) {
                    if (!inventory.duringManufacture) {
                        await this.inventoryService.changeInventoryAmount(inventory.inventoryId, variant.quantity * inventory.quantityInUse, variant.quantity * inventory.quantityInCost);
                    }
                }
                await this.stockService.increaseSold(variant._id, variant.quantity);
            }
            const orders = await this.ordersRepository.find();
            await this.ordersRepository.save({
                clientId: clientId || order.clientId,
                date: order.date,
                variants: order.variants,
                orderNumber: (orders.length + 1).toString().padStart(5, '0'),
            });
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to create manufacturing cost');
            return { success: false };
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(manufacturing_cost_entity_1.ManufacturingCost)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        error_service_1.ErrorService,
        stock_service_1.StockService,
        inventory_service_1.InventoryService,
        clients_service_1.ClientsService,
        variants_service_1.VariantsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map