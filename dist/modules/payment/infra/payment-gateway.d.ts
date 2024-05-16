import { IPaymentGateway } from '@modules/payment/core/payment-gateway';
import { ConfigService } from '@nestjs/config';
export declare class PaymentGateway implements IPaymentGateway {
    private configService;
    constructor(configService: ConfigService);
    create(orderId: string): Promise<void>;
}
