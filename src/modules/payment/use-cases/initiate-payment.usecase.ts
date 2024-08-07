import { Inject, Injectable } from '@nestjs/common';
import { IExceptionService } from '../../../shared/exceptions/exceptions.interface';
import { IPaymentGateway } from '../core/payment-gateway';
import { PaymentConfirmationDto } from '../dtos/payment-confirmation.dto';

@Injectable()
export class InitiatePaymentUseCase {
  constructor(
    @Inject(IPaymentGateway)
    private readonly paymentGateway: IPaymentGateway,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(paymentInitiate: PaymentConfirmationDto): Promise<void> {
    const orderId = paymentInitiate.identifier.orderId;

    if (!orderId) {
      this.exceptionService.badRequestException({
        message: 'Order ID is required',
        code: 400,
      });
    }

    return this.paymentGateway.create(orderId);
  }
}