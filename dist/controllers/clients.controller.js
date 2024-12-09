"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsController = void 0;
const tslib_1 = require("tslib");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const client_dto_1 = require("../dto/client.dto");
const shared_dto_1 = require("../dto/shared.dto");
const error_filter_1 = require("../filters/error.filter");
const clients_service_1 = require("../services/clients.service");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async getAllClients() {
        return this.clientsService.getAll();
    }
    async setContactsInfo(id, { contacts }) {
        return this.clientsService.setContactsInfo(id, contacts);
    }
};
exports.ClientsController = ClientsController;
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ClientsController.prototype, "getAllClients", null);
tslib_1.__decorate([
    (0, common_1.Put)('contacts/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id', shared_dto_1.ParseObjectIdPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [mongodb_1.ObjectId,
        client_dto_1.UpdateClientContactsDto]),
    tslib_1.__metadata("design:returntype", Promise)
], ClientsController.prototype, "setContactsInfo", null);
exports.ClientsController = ClientsController = tslib_1.__decorate([
    (0, common_1.Controller)('clients'),
    (0, common_1.UseFilters)(new error_filter_1.HttpExceptionFilter()),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map