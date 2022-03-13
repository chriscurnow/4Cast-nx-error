import { PaymentStatus } from '../payments';
import { PaymentAmountItem } from '../payments/amounts';

// import { SubcontractPayment }

import { Currency } from '@workspace/shared/util';

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
