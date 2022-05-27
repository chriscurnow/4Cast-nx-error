import { Currency, createCurrency } from '@workspace/shared/util';
import { setTypeValues } from '@workspace/shared/util';

export interface ContractAmounts {
  contractOriginal?: Currency;
  contractRevised?: Currency;
  retentionBalance?: Currency;
  toDateApproved?: Currency;
  toDateClaimed?: Currency;
  toDatePaid?: Currency;
  toDateVariations?: Currency;
  percentClaimed?: number;
  percentApproved?: number;
  amountRemaining?: Currency;
  previouslyApproved?: Currency;
}


