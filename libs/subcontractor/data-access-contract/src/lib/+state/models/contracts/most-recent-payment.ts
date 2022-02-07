import { PaymentStatus } from '../payments';
import { PaymentAmountItem } from '../payments/amounts.models';

// import { SubcontractPayment }

import { Currency } from '@workspace/shared/util';

export interface mostRecentamounts {
  toDate: Currency;
  percent: number | null | undefined;
  amount: Currency;
}

export interface MostRecentPayment {
  id: string;
  paymentNumber: number;
  status: PaymentStatus;
  claimed: PaymentAmountItem | null;
  approved: PaymentAmountItem | null;
}
