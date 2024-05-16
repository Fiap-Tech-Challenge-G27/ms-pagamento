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
exports.InitiatePaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const exceptions_interface_1 = require("../../../shared/exceptions/exceptions.interface");
let InitiatePaymentUseCase = class InitiatePaymentUseCase {
    constructor(httpService, exceptionService) {
        this.httpService = httpService;
        this.exceptionService = exceptionService;
    }
    async execute(orderId) {
        const url = process.env.PYTHON_PAYMENT_URL;
        const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(url, {
            identifier: { orderId }
        }));
        return response.data;
    }
};
exports.InitiatePaymentUseCase = InitiatePaymentUseCase;
exports.InitiatePaymentUseCase = InitiatePaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(exceptions_interface_1.IExceptionService)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object])
], InitiatePaymentUseCase);
//# sourceMappingURL=initiate-payment.usecase.js.map