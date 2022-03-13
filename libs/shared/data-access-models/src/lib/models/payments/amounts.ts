import { Currency } from '@workspace/shared/util';
import { MostRecentPayment } from '../contracts';

export interface Amounts {
  toDateApproved?: Currency;
  toDateClaimed?: Currency;
}

export interface AmountsUpdate {
  lastPayment: MostRecentPayment;
  amounts: Amounts;
}

export interface PaymentAmountItem {
  percent?: number;
  toDate?: Currency;
  amount?: Currency;
  previous?: Currency;
  contractOriginal?: Currency;
}

export interface PaymentAmounts {
  previouslyClaimed?: PaymentAmountItem;
  previouslyApproved?: PaymentAmountItem;
  thisClaimed?: PaymentAmountItem;
  thisApproved?: PaymentAmountItem;
  contractOriginal?: Currency;
  contractRevised?: Currency;
  toDateVariations?: Currency;
  amountRemaining?: Currency;
}

export function createAmountItem(data: PaymentAmountItem | undefined): PaymentAmountItem  {
   if (data) {
     return {
       percent: data.percent,
       toDate: data.toDate,
       amount: data.amount,
     };
   } else {
     return {}
   }
}
