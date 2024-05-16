import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { UseCase } from '@shared/core/use-case';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';

@Injectable()
export class InitiatePaymentUseCase implements UseCase {
    constructor(
        private httpService: HttpService,
        @Inject(IExceptionService)
        private readonly exceptionService: IExceptionService
    ) { }

    async execute(orderId: string): Promise<any> {
        
        const url = process.env.PYTHON_PAYMENT_URL; // URL do serviço Python

        const response = await lastValueFrom(
            this.httpService.post(url, {
                identifier: { orderId }
            })
        );

        return response.data;
    }
}
