import { HttpService } from '@nestjs/axios';
import { UseCase } from '@shared/core/use-case';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
export declare class InitiatePaymentUseCase implements UseCase {
    private httpService;
    private readonly exceptionService;
    constructor(httpService: HttpService, exceptionService: IExceptionService);
    execute(orderId: string): Promise<any>;
}
