'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UpdateClientContactDto = exports.ClientDto = void 0;
const tslib_1 = require('tslib');
const class_transformer_1 = require('class-transformer');
const class_validator_1 = require('class-validator');
const mongoose_1 = require('mongoose');
class ClientDto {}
exports.ClientDto = ClientDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', mongoose_1.Types.ObjectId),
    ],
    ClientDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    ClientDto.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    ClientDto.prototype,
    'contact',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsString)({ each: true }),
        tslib_1.__metadata('design:type', Array),
    ],
    ClientDto.prototype,
    'purchases',
    void 0
);
class UpdateClientContactDto {}
exports.UpdateClientContactDto = UpdateClientContactDto;
tslib_1.__decorate(
    [
        (0, class_transformer_1.Expose)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    UpdateClientContactDto.prototype,
    'contact',
    void 0
);
//# sourceMappingURL=client.dto.js.map
