import { Injectable } from "@nestjs/common";
import { ISNSGateway } from "../core/sns-gateway";
import { ConfigService } from "@nestjs/config";
import { PaymentConfirmationDto } from "../dtos/payment-confirmation.dto";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

@Injectable()
export class SNSGateway implements ISNSGateway {
  constructor(private configService: ConfigService) {}

  async post(paymentConfirmation: PaymentConfirmationDto) {
    try {
      const snsClient = new SNSClient({});

      const messageResponse = await snsClient.send(
        new PublishCommand({
          Message: JSON.stringify(paymentConfirmation),
          TopicArn: this.configService.get<string>("AWS_SNS_TOPIC_ARN"),
        })
      );

      console.info("Message: ", messageResponse);
    } catch (error) {
      console.error(error);
      throw new Error("Error on submit to payment-gateway");
    }
  }
}
