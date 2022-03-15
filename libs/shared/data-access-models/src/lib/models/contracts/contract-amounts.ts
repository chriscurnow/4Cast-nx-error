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

export function createContractAmounts(amounts: ContractAmounts | undefined): ContractAmounts {
  const newAmounts: ContractAmounts = {};
  if(amounts){
    newAmounts.contractOriginal = createCurrency(amounts.contractOriginal);
  newAmounts.contractRevised = createCurrency(amounts.contractRevised );
  newAmounts.retentionBalance = createCurrency(amounts.retentionBalance );
  newAmounts.toDateApproved = createCurrency(amounts.toDateApproved );
  newAmounts.toDateClaimed = createCurrency(amounts.toDateClaimed );
  newAmounts.toDatePaid = createCurrency(amounts.toDateVariations );
  newAmounts.toDateVariations = createCurrency(amounts.toDateVariations );
  newAmounts.amountRemaining = createCurrency(amounts.amountRemaining );
  newAmounts.previouslyApproved = createCurrency(amounts.previouslyApproved );

  const properties = ['percentClaimed', 'percentApproved'];
  setTypeValues(amounts, newAmounts, properties)

  }

  return newAmounts;


}
