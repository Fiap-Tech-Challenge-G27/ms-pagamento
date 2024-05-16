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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGateway = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let PaymentGateway = class PaymentGateway {
    constructor(configService) {
        this.configService = configService;
    }
    async create(orderId) {
        const url = this.configService.get('PAYMENT_API_URL');
        const data = {
            identifier: {
                orderId: orderId,
            },
        };
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        });
    }
};
exports.PaymentGateway = PaymentGateway;
exports.PaymentGateway = PaymentGateway = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaymentGateway);
//# sourceMappingURL=payment-gateway.js.map