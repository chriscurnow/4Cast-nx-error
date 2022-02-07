import { Currency } from '@workspace/shared/util';

export interface ContractAmounts {
  contractOriginal: Currency | null | undefined;
  contractRevised: Currency | null | undefined;
  retentionBalance?: Currency | null | undefined;
  toDateApproved?: Currency | null | undefined;
  toDateClaimed?: Currency | null | undefined;
  toDatePaid?: Currency | null | undefined;
  toDateVariations?: Currency | null | undefined;
  percentClaimed?: number | null | undefined;
  percentApproved?: number | null | undefined;
  amountRemaining?: Currency | null | undefined;
  previouslyApproved?: Currency | null | undefined;
}
