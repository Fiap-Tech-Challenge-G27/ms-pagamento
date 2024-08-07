import { Injectable, Inject } from "@nestjs/common";
import { PaymentConfirmationDto } from "../dtos/payment-confirmation.dto";
import { ISNSGateway } from "../core/sns-gateway";

@Injectable()
export class ConfirmPaymentUseCase {
  constructor(
    @Inject(ISNSGateway)
    private readonly snsGateway: ISNSGateway
  ) {}

  async execute(paymentConfirmation: PaymentConfirmationDto): Promise<void> {
    return this.snsGateway.post(paymentConfirmation);
  }
}
