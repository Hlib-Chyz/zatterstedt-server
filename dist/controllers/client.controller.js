'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClientController = void 0;
const tslib_1 = require('tslib');
const jwt_auth_guard_1 = require('../guards/jwt-auth.guard');
const common_1 = require('@nestjs/common');
const mongoose_1 = require('mongoose');
const client_dto_1 = require('../dto/client.dto');
const shared_dto_1 = require('../dto/shared.dto');
const client_facade_1 = require('../facades/client.facade');
const error_filter_1 = require('../filters/error.filter');
const client_service_1 = require('../services/client.service');
let ClientController = class ClientController {
    constructor(clientService, clientFacade) {
        this.clientService = clientService;
        this.clientFacade = clientFacade;
    }
    async getAll() {
        return this.clientFacade.getAll();
    }
    async updateContact(id, { contact }, res) {
        await this.clientService.updateContact(id, contact);
        res.status(204).send();
    }
};
exports.ClientController = ClientController;
tslib_1.__decorate(
    [
        (0, common_1.Get)(),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', []),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    ClientController.prototype,
    'getAll',
    null
);
tslib_1.__decorate(
    [
        (0, common_1.Put)('contact/:id'),
        tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
        tslib_1.__param(1, (0, common_1.Body)()),
        tslib_1.__param(2, (0, common_1.Res)()),
        tslib_1.__metadata('design:type', Function),
        tslib_1.__metadata('design:paramtypes', [
            mongoose_1.Types.ObjectId,
            client_dto_1.UpdateClientContactDto,
            Object,
        ]),
        tslib_1.__metadata('design:returntype', Promise),
    ],
    ClientController.prototype,
    'updateContact',
    null
);
exports.ClientController = ClientController = tslib_1.__decorate(
    [
        (0, common_1.Controller)('client'),
        (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        tslib_1.__metadata('design:paramtypes', [
            client_service_1.ClientService,
            client_facade_1.ClientFacade,
        ]),
    ],
    ClientController
);
//# sourceMappingURL=client.controller.js.map
