import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from 'src/modules//payment/payment.module';
import { HealthModule } from 'src/modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PaymentModule,
    HealthModule,
  ]
})
export class AppModule {}
