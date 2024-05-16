import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum PaymentState {
  Pending = 'Pending',
  Approved = 'Approved',
  Canceled = 'Canceled'
}

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PaymentState,
    default: PaymentState.Pending
  })
  state: PaymentState;

  @Column({ nullable: false })
  orderId: string;  // Referência ao ID do pedido para rastreamento e correlação

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(orderId: string, state: PaymentState = PaymentState.Pending) {
    this.orderId = orderId;
    this.state = state;
  }
}
