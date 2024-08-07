import { Test, TestingModule } from "@nestjs/testing";
import { PaymentController } from "../controller/payment.controller";
import { PaymentConfirmationDto } from "../dtos/payment-confirmation.dto";
import { InitiatePaymentUseCase } from "../use-cases/initiate-payment.usecase";
import { ConfirmPaymentUseCase } from "../use-cases/confirm-payment.usecase";
import { ISNSGateway } from "../core/sns-gateway";
import { SNSGateway } from "../infra/sns-gateway";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { ConfigService } from "@nestjs/config";

jest.mock("@aws-sdk/client-sns");

describe("PaymentController", () => {
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
        ConfirmPaymentUseCase,
        {
          provide: ISNSGateway,
          useClass: SNSGateway,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue("mock-topic-arn"),
          },
        },
      ],
    }).compile();

    paymentController = module.get<PaymentController>(PaymentController);
    initiatePaymentUseCase = module.get<InitiatePaymentUseCase>(
      InitiatePaymentUseCase
    );
  });

  it("should be defined", () => {
    expect(paymentController).toBeDefined();
  });

  describe("POST /initiate", () => {
    it("should initiate payment successfully", async () => {
      const paymentInitiateDto: PaymentConfirmationDto = {
        identifier: { orderId: "orderId123" },
        status: "Pending",
      };

      await paymentController.initiatePayment(paymentInitiateDto);

      expect(initiatePaymentUseCase.execute).toHaveBeenCalledWith(
        paymentInitiateDto
      );
    });

    it("should handle errors", async () => {
      const paymentInitiateDto: PaymentConfirmationDto = {
        identifier: { orderId: "orderId123" },
        status: "Pending",
      };

      jest
        .spyOn(initiatePaymentUseCase, "execute")
        .mockRejectedValueOnce(new Error("Payment creation failed"));

      await expect(
        paymentController.initiatePayment(paymentInitiateDto)
      ).rejects.toThrow("Payment creation failed");
    });
  });

  describe("POST /", () => {
    it("should post to SNS", async () => {
      const paymentConfirmation = {
        identifier: { orderId: "order_id" },
        status: "approved",
      };
      const mockResponse = { MessageId: "mock-message-id" };

      const snsClient = SNSClient.prototype;
      snsClient.send = jest.fn().mockResolvedValue(mockResponse);

      await paymentController.confirmPayment(paymentConfirmation);

      expect(snsClient.send).toHaveBeenCalledWith(expect.any(PublishCommand));
      expect(snsClient.send).toHaveBeenCalledTimes(1);
    });
  });
});
