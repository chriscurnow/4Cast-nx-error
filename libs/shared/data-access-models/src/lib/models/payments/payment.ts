
import { PaymentStatus } from './payment-status';
import { MostRecentPayment } from '../contracts';
import { Currency } from '@workspace/shared/util';
import { PaymentHeader } from './payment-header';
import { PaymentAmounts, PaymentAmountItem } from './amounts';
import { SubcontractItem } from '../contracts'
export interface ApprovedPaymentUpdate {

  'amounts.thisClaimed': Record<string, unknown>;
  status: PaymentStatus;
}

interface Amounts {
  toDateApproved?: Currency | null | undefined;
  toDateClaimed?: Currency | null | undefined;
}

interface AmountsUpdate {
  lastPayment: MostRecentPayment;
  amounts: Amounts;
}

export interface PaymentSubcontractUpdate {
  lastPayment?: MostRecentPayment;
  toDateApproved?: PaymentAmountItem;
  toDateClaimed?: PaymentAmountItem;
  updateData?: AmountsUpdate;
  amounts: Amounts;
}

export interface SubcontractPayment {
  id?: string;
  amounts?: PaymentAmounts;
  subcontractId?: string;
  paymentHeader?: PaymentHeader;
  status?: PaymentStatus;
  projectId?: string;
}

export interface PaymentItem {
  id?: string;
  payment?: SubcontractPayment;
  contractItem?: SubcontractItem;
  amounts?: PaymentAmounts;
}

 export function setPaymentDate(payment: SubcontractPayment, newDate: Date): void {
      if (!payment.paymentHeader ) {
        payment.paymentHeader = {};
      }
       payment.paymentHeader.paymentDate = newDate;
    }


