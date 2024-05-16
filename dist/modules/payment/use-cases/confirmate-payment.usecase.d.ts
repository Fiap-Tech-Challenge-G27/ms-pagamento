import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { UseCase } from '@shared/core/use-case';
export declare class ConfirmatePaymentUseCase implements UseCase {
    private readonly exceptionService;
    constructor(exceptionService: IExceptionService);
    execute(orderId: string, paymentStatus: string): Promise<void>;
}
