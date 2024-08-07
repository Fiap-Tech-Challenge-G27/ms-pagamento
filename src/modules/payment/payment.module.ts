import { MiddlewareConsumer, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { PaymentController } from "./controller/payment.controller";
import { ExceptionsService } from "../../shared/infra/exceptions/exceptions.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { IExceptionService } from "../../shared/exceptions/exceptions.interface";
import { JwtModule } from "@nestjs/jwt";
import { IPaymentGateway } from "./core/payment-gateway";
import { PaymentGateway } from "./infra/payment-gateway";
import { InitiatePaymentUseCase } from "./use-cases/initiate-payment.usecase";
import { SNSConfirmationMiddleware } from "../../shared/sns/SNSConfirmationMiddleware";
import { ConfirmPaymentUseCase } from "./use-cases/confirm-payment.usecase";
import { ISNSGateway } from "./core/sns-gateway";
import { SNSGateway } from "./infra/sns-gateway";

@Module({
  imports: [HttpModule, JwtModule, ConfigModule],
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
    {
      provide: ISNSGateway,
      useClass: SNSGateway,
    },
    ConfigService,
    InitiatePaymentUseCase,
    ConfirmPaymentUseCase,
  ],
})
export class PaymentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SNSConfirmationMiddleware).forRoutes("payment/initiate");
  }
}
