import { PaymentConfirmationDto } from "../dtos/payment-confirmation.dto";

export abstract class ISNSGateway {
  abstract post(paymentConfirmation: PaymentConfirmationDto): Promise<void>;
}
