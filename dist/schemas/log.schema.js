"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSchema = exports.Log = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Log = class Log {
};
exports.Log = Log;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Log.prototype, "operation", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    tslib_1.__metadata("design:type", String)
], Log.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true }),
    tslib_1.__metadata("design:type", mongoose_2.Types.ObjectId)
], Log.prototype, "documentId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: null }),
    tslib_1.__metadata("design:type", Object)
], Log.prototype, "oldData", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: null }),
    tslib_1.__metadata("design:type", Object)
], Log.prototype, "newData", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    tslib_1.__metadata("design:type", Date)
], Log.prototype, "createdAt", void 0);
exports.Log = Log = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Log);
exports.LogSchema = mongoose_1.SchemaFactory.createForClass(Log);
//# sourceMappingURL=log.schema.js.map