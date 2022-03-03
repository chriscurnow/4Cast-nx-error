export enum PaymentStatus {
  New = -1,
  Draft,
  Submitted,
  Approved,
}

export interface PaymentStatusLogItem {
  oldPaymentStatus: PaymentStatus;
  newPaymentStatus: PaymentStatus;
  timestamp: number;
  date: Date;
  user: {
    id: string;
    name: string;
  };
}
