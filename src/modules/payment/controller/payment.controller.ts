import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaymentConfirmationDto } from "../dtos/payment-confirmation.dto";
import { ConfirmPaymentUseCase } from "../use-cases/confirm-payment.usecase";
import { InitiatePaymentUseCase } from "../use-cases/initiate-payment.usecase";

@ApiTags("payment")
@Controller("payment")
export class PaymentController {
  constructor(
    private readonly initiatePaymentUseCase: InitiatePaymentUseCase,
    private readonly confirmPaymentUseCase: ConfirmPaymentUseCase
  ) {}

  @Post("/initiate")
  initiatePayment(
    @Body() paymentInitiate: PaymentConfirmationDto
  ): Promise<void> {
    console.log(paymentInitiate);
    return this.initiatePaymentUseCase.execute(paymentInitiate);
  }

  @Post("/confirm")
  confirmPayment(@Body() paymentConfirmation: PaymentConfirmationDto): Promise<void> {
    return this.confirmPaymentUseCase.execute(paymentConfirmation);
  }
}
