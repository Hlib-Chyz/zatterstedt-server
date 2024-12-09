"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const mongodb_1 = require("mongodb");
const client_entity_1 = require("../entities/client.entity");
const typeorm_2 = require("typeorm");
const error_service_1 = require("./error.service");
const order_entity_1 = require("../entities/order.entity");
const variants_service_1 = require("./variants.service");
let ClientsService = class ClientsService {
    constructor(clientsRepository, ordersRepository, variantsService, errorService) {
        this.clientsRepository = clientsRepository;
        this.ordersRepository = ordersRepository;
        this.variantsService = variantsService;
        this.errorService = errorService;
    }
    async getAll() {
        try {
            const res = [];
            const clients = await this.clientsRepository.find();
            for (const client of clients) {
                const orders = await this.ordersRepository.find({
                    where: { clientId: client._id.toString() },
                });
                const purchases = [];
                for (const order of orders) {
                    for (const variant of order.variants) {
                        const newPurchase = `${await this.variantsService.getVariantInfo(variant._id, `${variant.quantity}/${variant.price}`)}`;
                        purchases.push(newPurchase);
                    }
                }
                res.push({ ...client, purchases });
            }
            return res;
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get all clients');
            return [];
        }
    }
    async getByClientId(clientId) {
        try {
            const client = await this.clientsRepository.findOne({
                where: { _id: new mongodb_1.ObjectId(clientId) },
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
            return client;
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to get all clients');
            return {};
        }
    }
    async add(client) {
        try {
            const { _id } = await this.clientsRepository.save(client);
            return _id;
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to add client');
            return { success: false };
        }
    }
    async setContactsInfo(_id, contactsInfo) {
        try {
            const client = await this.clientsRepository.findOne({
                where: { _id },
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
            await this.clientsRepository.save({ ...client, contacts: contactsInfo });
            return { success: true };
        }
        catch (error) {
            this.errorService.throwError(error, 'Failed to set contacts info');
            return { success: false };
        }
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    tslib_1.__param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        variants_service_1.VariantsService,
        error_service_1.ErrorService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map