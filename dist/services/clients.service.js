'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClientsService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const typeorm_1 = require('@nestjs/typeorm');
const mongodb_1 = require('mongodb');
const client_entity_1 = require('../entities/client.entity');
const typeorm_2 = require('typeorm');
const error_service_1 = require('./error.service');
let ClientsService = class ClientsService {
    constructor(clientsRepository, errorService) {
        this.clientsRepository = clientsRepository;
        this.errorService = errorService;
    }
    async getByClientId(clientId) {
        try {
            return await this.getClient(new mongodb_1.ObjectId(clientId));
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all clients');
            return {};
        }
    }
    async add(client) {
        try {
            const { _id } = await this.clientsRepository.save(client);
            return _id;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add client');
            return { success: false };
        }
    }
    async setContactsInfo(_id, contactsInfo) {
        try {
            const client = await this.getClient(_id);
            await this.clientsRepository.save({ ...client, contacts: contactsInfo });
            return { success: true };
        } catch (error) {
            this.errorService.throwError(error, 'Failed to set contacts info');
            return { success: false };
        }
    }
    async getAll() {
        try {
            return await this.clientsRepository.find();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all Clients');
            return [];
        }
    }
    async getClient(_id) {
        try {
            const client = await this.clientsRepository.findOne({
                where: { _id },
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
            return client;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get client');
            return {};
        }
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
        tslib_1.__metadata('design:paramtypes', [
            typeorm_2.Repository,
            error_service_1.ErrorService,
        ]),
    ],
    ClientsService
);
//# sourceMappingURL=clients.service.js.map
