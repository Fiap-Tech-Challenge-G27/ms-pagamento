import { PaymentConfirmationDto } from '../dtos/payment-confirmation.dto';
import { ConfirmatePaymentUseCase } from '../use-cases/confirmate-payment.usecase';
export declare class PaymentController {
    private readonly confirmatePaymentUseCase;
    constructor(confirmatePaymentUseCase: ConfirmatePaymentUseCase);
    receivePaymentConfirmation(payment_confirmation: PaymentConfirmationDto): Promise<void>;
}
