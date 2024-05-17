import { Test, TestingModule } from '@nestjs/testing';
import { InitiatePaymentUseCase } from '../use-cases/initiate-payment.usecase';
import { IPaymentGateway } from '../core/payment-gateway';
import { IExceptionService } from '../../../shared/exceptions/exceptions.interface';
import { PaymentConfirmationDto } from '../dtos/payment-confirmation.dto';
import { BadRequestException } from '@nestjs/common';

describe('InitiatePaymentUseCase', () => {
  let useCase: InitiatePaymentUseCase;
  let paymentGatewayMock: IPaymentGateway;
  let exceptionServiceMock: IExceptionService;

  beforeEach(async () => {
    paymentGatewayMock = {
      create: jest.fn(),
    };

    exceptionServiceMock = {
      badRequestException: jest.fn().mockImplementation(() => {
        throw new BadRequestException('Order ID is required');
      }),
    } as unknown as IExceptionService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InitiatePaymentUseCase,
        { provide: IPaymentGateway, useValue: paymentGatewayMock },
        { provide: IExceptionService, useValue: exceptionServiceMock },
      ],
    }).compile();

    useCase = module.get<InitiatePaymentUseCase>(InitiatePaymentUseCase);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should initiate payment', async () => {
    const paymentInitiateDto: PaymentConfirmationDto = {
      identifier: { orderId: 'orderId123' },
      status: 'Pending',
    };

    await useCase.execute(paymentInitiateDto);

    expect(paymentGatewayMock.create).toHaveBeenCalledWith('orderId123');
  });

  it('should throw BadRequestException if orderId is missing', async () => {
    const paymentInitiateDto: PaymentConfirmationDto = {
      identifier: { orderId: '' },
      status: 'Pending',
    };

    await expect(useCase.execute(paymentInitiateDto)).rejects.toThrow(BadRequestException);
  });
});
