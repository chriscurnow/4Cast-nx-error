export interface PaymentHeader {
  paymentNumber?: number;
  paymentDate?: Date;
  paymentMoment?: moment.Moment;
  supplierReference?: string;
  details?: string;
  accountingPeriod?: number;

}


