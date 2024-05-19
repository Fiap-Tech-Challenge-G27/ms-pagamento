import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '../../src/modules/payment/controller/payment.controller';
import { InitiatePaymentUseCase } from '../../src/modules/payment/use-cases/initiate-payment.usecase';
import { PaymentConfirmationDto } from '../../src/modules/payment/dtos/payment-confirmation.dto';
import { IPaymentGateway } from '../../src/modules/payment/core/payment-gateway';
import { IExceptionService } from '../../src/shared/exceptions/exceptions.interface';
import { ConfigService } from '@nestjs/config';

const feature = loadFeature('behavior_tests/features/initiatePayment.feature');

defineFeature(feature, (test) => {
  let paymentController: PaymentController;
  let paymentGatewayMock: IPaymentGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: IPaymentGateway,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: IExceptionService,
          useClass: class {
            badRequestException = jest.fn();
          },
        },
        InitiatePaymentUseCase,
        ConfigService
      ],
    }).compile();

    paymentController = module.get<PaymentController>(PaymentController);
    paymentGatewayMock = module.get<IPaymentGateway>(IPaymentGateway);
  });

  test('Successful Payment Initiation', ({ given, when, then }) => {
    let paymentInitiateDto: PaymentConfirmationDto;

    given('I have an order with ID "order123"', () => {
      paymentInitiateDto = {
        identifier: { orderId: 'order123' },
        status: 'Pending',
      };
    });

    when('I initiate the payment for the order', async () => {
      await paymentController.initiatePayment(paymentInitiateDto);
    });

    then('the payment gateway should receive a request to create a payment for "order123"', () => {
      expect(paymentGatewayMock.create).toHaveBeenCalledWith('order123');
    });

  });
});
