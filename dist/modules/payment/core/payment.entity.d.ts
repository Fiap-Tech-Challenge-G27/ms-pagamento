export declare enum PaymentState {
    Pending = "Pending",
    Approved = "Approved",
    Canceled = "Canceled"
}
export declare class PaymentEntity {
    id: string;
    state: PaymentState;
    orderId: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(orderId: string, state?: PaymentState);
}
