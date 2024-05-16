import { Test, TestingModule } from '@nestjs/testing';
import { PaymentModule } from '../payment.module';
import { ConfigModule } from '@nestjs/config';

describe('PaymentModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        PaymentModule,
        ConfigModule.forRoot(),
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
