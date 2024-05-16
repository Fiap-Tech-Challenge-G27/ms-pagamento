"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmatePaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const exceptions_interface_1 = require("../../../shared/exceptions/exceptions.interface");
const payment_entity_1 = require("../core/payment.entity");
const PAYMENT_STATUS_MAP = new Map([
    ['approved', payment_entity_1.PaymentState.Approved],
    ['canceled', payment_entity_1.PaymentState.Canceled],
]);
let ConfirmatePaymentUseCase = class ConfirmatePaymentUseCase {
    constructor(exceptionService) {
        this.exceptionService = exceptionService;
    }
    async execute(orderId, paymentStatus) {
        const fieldsToUpdate = {};
        if (PAYMENT_STATUS_MAP.has(paymentStatus)) {
            fieldsToUpdate['paymentState'] = PAYMENT_STATUS_MAP.get(paymentStatus);
        }
    }
};
exports.ConfirmatePaymentUseCase = ConfirmatePaymentUseCase;
exports.ConfirmatePaymentUseCase = ConfirmatePaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(exceptions_interface_1.IExceptionService)),
    __metadata("design:paramtypes", [Object])
], ConfirmatePaymentUseCase);
//# sourceMappingURL=confirmate-payment.usecase.js.map