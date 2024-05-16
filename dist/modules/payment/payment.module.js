"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const payment_controller_1 = require("./controller/payment.controller");
const exceptions_service_1 = require("../../shared/infra/exceptions/exceptions.service");
const exceptions_interface_1 = require("../../shared/exceptions/exceptions.interface");
const confirmate_payment_usecase_1 = require("./use-cases/confirmate-payment.usecase");
const jwt_1 = require("@nestjs/jwt");
const payment_gateway_1 = require("./core/payment-gateway");
const payment_gateway_2 = require("./infra/payment-gateway");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            jwt_1.JwtModule,
        ],
        controllers: [payment_controller_1.PaymentController],
        providers: [
            {
                provide: exceptions_interface_1.IExceptionService,
                useClass: exceptions_service_1.ExceptionsService,
            },
            {
                provide: payment_gateway_1.IPaymentGateway,
                useClass: payment_gateway_2.PaymentGateway,
            },
            confirmate_payment_usecase_1.ConfirmatePaymentUseCase
        ],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map