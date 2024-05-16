import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Request,
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentConfirmationDto } from '../dtos/payment-confirmation.dto';
import { ConfirmatePaymentUseCase } from '../use-cases/confirmate-payment.usecase';
import { IPaymentGateway } from '../core/payment-gateway';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly confirmatePaymentUseCase: ConfirmatePaymentUseCase,
    @Inject(IPaymentGateway)
    private readonly paymentGateway: IPaymentGateway
  ) {}

  @Post('/initiate')
  initiatePayment(@Body() payment_initiate: PaymentConfirmationDto): Promise<void> {
    const orderId = payment_initiate['identifier']['orderId'];
    return this.paymentGateway.create(orderId);
  }

  @Post('/webhooks/payment-confirmation')
  receivePaymentConfirmation(
    @Body() payment_confirmation: PaymentConfirmationDto,
  ): Promise<void> {
    const orderId = payment_confirmation['identifier']['orderId'];
    const status = payment_confirmation['status'];

    return this.confirmatePaymentUseCase.execute(orderId, status);
  }
}