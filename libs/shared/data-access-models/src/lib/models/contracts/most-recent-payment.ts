import { PaymentStatus } from '../payments';
import { PaymentAmountItem, createAmountItem } from '../payments/amounts';

// import { SubcontractPayment }

import { Currency, setTypeValues } from '@workspace/shared/util';

export interface mostRecentamounts {
  toDate?: Currency;
  percent?: number;
  amount?: Currency;
}

export interface MostRecentPayment {
  id?: string;
  paymentNumber?: number;
  status?: PaymentStatus;
  claimed?: PaymentAmountItem;
  approved?: PaymentAmountItem;
}

export function createMostRecentPayment(payment: MostRecentPayment | undefined): MostRecentPayment{
  const newPayment: MostRecentPayment = {};
  if (payment){
    const properties = ['id', 'paymentNumber', 'status'];
    setTypeValues<MostRecentPayment>(payment, newPayment, properties);
    newPayment.claimed = createAmountItem(payment.claimed);
    newPayment.approved = createAmountItem(payment.approved);
  }

  return newPayment;
}
