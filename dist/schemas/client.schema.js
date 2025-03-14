'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ClientSchema = exports.Client = void 0;
const tslib_1 = require('tslib');
const mongoose_1 = require('@nestjs/mongoose');
const log_helper_1 = require('../helpers/log.helper');
let Client = class Client {};
exports.Client = Client;
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: String, required: true }),
        tslib_1.__metadata('design:type', String),
    ],
    Client.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, mongoose_1.Prop)({ type: String, required: true }),
        tslib_1.__metadata('design:type', String),
    ],
    Client.prototype,
    'contact',
    void 0
);
exports.Client = Client = tslib_1.__decorate([(0, mongoose_1.Schema)()], Client);
exports.ClientSchema = mongoose_1.SchemaFactory.createForClass(Client);
exports.ClientSchema.index({ name: 1, contact: 1 }, { unique: true });
(0, log_helper_1.log)(exports.ClientSchema, Client.name);
//# sourceMappingURL=client.schema.js.map
