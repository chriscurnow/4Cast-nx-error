import { PaymentStatus } from '.';

export interface ApprovedPaymentUpdate {
  'amounts.thisClaimed': Record<string, unknown>;
  status: PaymentStatus;
}
