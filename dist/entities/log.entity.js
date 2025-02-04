'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Log = void 0;
const tslib_1 = require('tslib');
const typeorm_1 = require('typeorm');
const mongodb_1 = require('mongodb');
const class_validator_1 = require('class-validator');
let Log = class Log {};
exports.Log = Log;
tslib_1.__decorate(
    [(0, typeorm_1.ObjectIdColumn)(), tslib_1.__metadata('design:type', mongodb_1.ObjectId)],
    Log.prototype,
    '_id',
    void 0
);
tslib_1.__decorate(
    [
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    Log.prototype,
    'operation',
    void 0
);
tslib_1.__decorate(
    [
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    Log.prototype,
    'collection',
    void 0
);
tslib_1.__decorate(
    [
        (0, typeorm_1.Column)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)(),
        tslib_1.__metadata('design:type', String),
    ],
    Log.prototype,
    'documentId',
    void 0
);
tslib_1.__decorate(
    [
        (0, typeorm_1.Column)({ type: 'json', nullable: true }),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Object),
    ],
    Log.prototype,
    'oldData',
    void 0
);
tslib_1.__decorate(
    [
        (0, typeorm_1.Column)({ type: 'json', nullable: true }),
        (0, class_validator_1.IsNotEmpty)(),
        tslib_1.__metadata('design:type', Object),
    ],
    Log.prototype,
    'newData',
    void 0
);
tslib_1.__decorate(
    [(0, typeorm_1.CreateDateColumn)(), tslib_1.__metadata('design:type', Date)],
    Log.prototype,
    'createdAt',
    void 0
);
exports.Log = Log = tslib_1.__decorate([(0, typeorm_1.Entity)('logs')], Log);
//# sourceMappingURL=log.entity.js.map
