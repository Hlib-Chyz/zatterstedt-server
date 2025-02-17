'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UpdateClientContactsDto = exports.CreateClientContactsDto = exports.ClientDto = void 0;
const tslib_1 = require('tslib');
const class_validator_1 = require('class-validator');
const mongodb_1 = require('mongodb');
class ClientDto {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ClientDto = ClientDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', mongodb_1.ObjectId),
    ],
    ClientDto.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
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
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.IsString)({ each: true }),
        tslib_1.__metadata('design:type', Array),
    ],
    ClientDto.prototype,
    'purchases',
    void 0
);
class CreateClientContactsDto {}
exports.CreateClientContactsDto = CreateClientContactsDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateClientContactsDto.prototype,
    'name',
    void 0
);
tslib_1.__decorate(
    [
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    CreateClientContactsDto.prototype,
    'contact',
    void 0
);
class UpdateClientContactsDto {}
exports.UpdateClientContactsDto = UpdateClientContactsDto;
tslib_1.__decorate(
    [
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', String),
    ],
    UpdateClientContactsDto.prototype,
    'contact',
    void 0
);
//# sourceMappingURL=client.dto.js.map
