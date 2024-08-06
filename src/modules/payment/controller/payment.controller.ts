import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaymentConfirmationDto } from "../dtos/payment-confirmation.dto";
import { InitiatePaymentUseCase } from "../use-cases/initiate-payment.usecase";

@ApiTags("payment")
@Controller("payment")
export class PaymentController {
  constructor(
    private readonly initiatePaymentUseCase: InitiatePaymentUseCase
  ) {}

  @Post("/initiate")
  initiatePayment(
    @Body() paymentInitiate: PaymentConfirmationDto
  ): Promise<void> {
    return this.initiatePaymentUseCase.execute(paymentInitiate);
  }
}
