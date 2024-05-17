import { Injectable } from '@nestjs/common';
import { IPaymentGateway } from '../core/payment-gateway';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentGateway implements IPaymentGateway {
  constructor(private configService: ConfigService) {}

  async create(orderId: string) {
    const url = this.configService.get<string>('PAYMENT_API_URL');
    
    console.log(url);

    if (!url) {
      throw new Error('PAYMENT_API_URL is not defined in the environment variables');
    }

    const data = {
      identifier: {
        orderId: orderId
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    });
  }
}
