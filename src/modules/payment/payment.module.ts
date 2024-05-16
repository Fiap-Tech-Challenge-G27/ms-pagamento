import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentController } from './controller/payment.controller';
import { ExceptionsService } from '@shared/infra/exceptions/exceptions.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IExceptionService } from '@shared/exceptions/exceptions.interface';
import { JwtModule } from '@nestjs/jwt';
import { IPaymentGateway } from './core/payment-gateway';
import { PaymentGateway } from './infra/payment-gateway';
import { InitiatePaymentUseCase } from './use-cases/initiate-payment.usecase';

@Module({
  imports: [
    HttpModule,
    JwtModule,
    ConfigModule,
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
    ConfigService,
    InitiatePaymentUseCase,
  ],
})
export class PaymentModule {}
