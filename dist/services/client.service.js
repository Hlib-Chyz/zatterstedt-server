'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClientService = void 0;
const tslib_1 = require('tslib');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('@nestjs/mongoose');
const mongoose_2 = require('mongoose');
const client_schema_1 = require('../schemas/client.schema');
const error_service_1 = require('./error.service');
let ClientService = class ClientService {
    constructor(clientModel, errorService) {
        this.clientModel = clientModel;
        this.errorService = errorService;
    }
    async add(name, contact, session) {
        try {
            const newClient = new this.clientModel({ name, contact });
            newClient.$session(session);
            await newClient.save();
            return newClient._id;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add client');
            return {};
        }
    }
    async getById(id) {
        try {
            const client = await this.clientModel.findById(id).exec();
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
            return client;
        } catch (error) {
            this.errorService.throwError(error, 'Failed to add client');
            return {};
        }
    }
    async updateContact(id, contact) {
        try {
            const updatedClient = await this.clientModel
                .findOneAndUpdate({ _id: id }, { contact })
                .exec();
            if (!updatedClient) {
                throw new common_1.NotFoundException('Client not found');
            }
        } catch (error) {
            this.errorService.throwError(error, 'Failed to update contact');
        }
    }
    async getAll() {
        try {
            return await this.clientModel.find().exec();
        } catch (error) {
            this.errorService.throwError(error, 'Failed to get all Clients');
            return [];
        }
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = tslib_1.__decorate(
    [
        (0, common_1.Injectable)(),
        tslib_1.__param(0, (0, mongoose_1.InjectModel)(client_schema_1.Client.name)),
        tslib_1.__metadata('design:paramtypes', [mongoose_2.Model, error_service_1.ErrorService]),
    ],
    ClientService
);
//# sourceMappingURL=client.service.js.map
