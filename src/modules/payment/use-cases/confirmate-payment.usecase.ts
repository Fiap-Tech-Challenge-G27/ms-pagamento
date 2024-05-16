import { Inject, Injectable } from '@nestjs/common';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { UseCase } from '@shared/core/use-case';
import { PaymentState } from '@payment/core/payment.entity';

const PAYMENT_STATUS_MAP = new Map<string, PaymentState>([
  ['approved', PaymentState.Approved],
  ['canceled', PaymentState.Canceled],
]);

@Injectable()
export class ConfirmatePaymentUseCase implements UseCase {
  constructor(
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(orderId: string, paymentStatus: string) {

    const fieldsToUpdate = {};

    if (PAYMENT_STATUS_MAP.has(paymentStatus)) {
      fieldsToUpdate['paymentState'] = PAYMENT_STATUS_MAP.get(paymentStatus);
    }

  }
}
