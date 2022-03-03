import { Currency } from '@workspace/shared/util';
import { MostRecentPayment } from '../contracts';

export interface Amounts {
  toDateApproved?: Currency | null | undefined;
  toDateClaimed?: Currency | null | undefined;
}

export interface AmountsUpdate {
  lastPayment: MostRecentPayment;
  amounts: Amounts;
}

export interface PaymentAmountItem {
  percent: number | null | undefined;
  toDate: Currency | null | undefined;
  amount: Currency | null | undefined;
  previous?: Currency | null | undefined;
  contractOriginal?: Currency | null | undefined;
}

export interface PaymentAmounts {
  previouslyClaimed: PaymentAmountItem | null | undefined;
  previouslyApproved: PaymentAmountItem | null | undefined;
  thisClaimed?: PaymentAmountItem | null | undefined;
  thisApproved?: PaymentAmountItem | null | undefined;
  contractOriginal?: Currency | null | undefined;
  contractRevised?: Currency | null | undefined;
  toDateVariations?: Currency | null | undefined;
  amountRemaining?: Currency | null | undefined;
}
