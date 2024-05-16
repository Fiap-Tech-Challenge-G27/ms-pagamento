import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentController } from './controller/payment.controller';
import { ExceptionsService } from '@shared/infra/exceptions/exceptions.service';
import { IExceptionService } from 'src/shared/exceptions/exceptions.interface';
import { ConfirmatePaymentUseCase } from './use-cases/confirmate-payment.usecase';
import { JwtModule } from '@nestjs/jwt';
import { IPaymentGateway } from './core/payment-gateway';
import { PaymentGateway } from './infra/payment-gateway';

@Module({
  imports: [
    HttpModule,
    JwtModule,
  ],
  controllers: [PaymentController],
  providers: [
    {
      provide: IExceptionService,
      useClass: ExceptionsService,
    },
    {
      provide: IPaymentGateway,
      useClass: PaymentGateway,
    },
    ConfirmatePaymentUseCase
  ],
})
export class PaymentModule {}
