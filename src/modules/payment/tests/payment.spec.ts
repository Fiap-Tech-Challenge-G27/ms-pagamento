import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from '../controller/payment.controller';
import { InitiatePaymentUseCase } from '../use-cases/initiate-payment.usecase';
import { PaymentConfirmationDto } from '../dtos/payment-confirmation.dto';

describe('PaymentController', () => {
  let paymentController: PaymentController;
  let initiatePaymentUseCase: InitiatePaymentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: InitiatePaymentUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    paymentController = module.get<PaymentController>(PaymentController);
    initiatePaymentUseCase = module.get<InitiatePaymentUseCase>(InitiatePaymentUseCase);
  });

  it('should be defined', () => {
    expect(paymentController).toBeDefined();
  });

  describe('POST /initiate', () => {
    it('should initiate payment successfully', async () => {
      const paymentInitiateDto: PaymentConfirmationDto = {
        identifier: { orderId: 'orderId123' },
        status: 'Pending',
      };

      await paymentController.initiatePayment(paymentInitiateDto);

      expect(initiatePaymentUseCase.execute).toHaveBeenCalledWith(paymentInitiateDto);
    });

    it('should handle errors', async () => {
      const paymentInitiateDto: PaymentConfirmationDto = {
        identifier: { orderId: 'orderId123' },
        status: 'Pending',
      };

      jest.spyOn(initiatePaymentUseCase, 'execute').mockRejectedValueOnce(new Error('Payment creation failed'));

      await expect(paymentController.initiatePayment(paymentInitiateDto)).rejects.toThrow('Payment creation failed');
    });
  });
});
