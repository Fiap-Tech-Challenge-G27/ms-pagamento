import { Test, TestingModule } from '@nestjs/testing';
import { PaymentGateway } from '../infra/payment-gateway';
import { ConfigService } from '@nestjs/config';

describe('PaymentGateway', () => {
  let paymentGateway: PaymentGateway;
  let configServiceMock: ConfigService;

  beforeEach(async () => {
    configServiceMock = {
      get: jest.fn().mockReturnValue('http://mock.url'),
    } as unknown as ConfigService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentGateway,
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    paymentGateway = module.get<PaymentGateway>(PaymentGateway);
  });

  it('should be defined', () => {
    expect(paymentGateway).toBeDefined();
  });

  it('should create a payment', async () => {
    const fetchMock = jest.fn().mockResolvedValueOnce({ ok: true });
    global.fetch = fetchMock;

    await paymentGateway.create('orderId123');

    expect(fetchMock).toHaveBeenCalledWith('http://mock.url', {
      method: 'POST',
      body: JSON.stringify({
        identifier: { orderId: 'orderId123' },
      }),
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    });
  });
});
