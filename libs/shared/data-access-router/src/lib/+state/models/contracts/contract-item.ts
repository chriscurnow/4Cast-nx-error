import { Currency } from '@workspace/shared/util'


import * as moment from 'moment';
import { SubcontractEntity } from './subcontract.model';
import { PaymentStatus } from '../payments';

export interface ContractItem {
  id?: string;
  isNew?: boolean;
  isDraft?: boolean;
  itemDate?: Date | moment.Moment;
  itemNumber?: number | undefined;
  title?: string | undefined;
  details?: string | undefined;
  contractAmount?: Currency;
  claimedToDate?: Currency;
  approvedToDate?: Currency;
  claimedPercent?: number | undefined;
  approvedPercent?: number | undefined;
  amountRemaining?: Currency;
  subcontractorRef?: string;
  contractorRef?: string;
  status?: number;
  subcontractId?: string;
  projectId?: string;
}

export enum ContractItemStatus {
  New,
  Draft,
  Submitted,
  Approved,
}

export function createItemForApprovedContract(subcontract: SubcontractEntity): any {
    const contractItem: ContractItem = {};
    if (subcontract.amounts) {
      if (subcontract.amounts.contractOriginal) {
        contractItem.contractAmount = new Currency(
          subcontract.amounts.contractOriginal
        );
      }
      contractItem.amountRemaining = contractItem.contractAmount;
    }

    contractItem.itemDate = new Date();
    contractItem.title = 'Original Contract';
    contractItem.itemNumber = 0;
    contractItem.approvedPercent = 0;
    contractItem.claimedPercent = 0;
    contractItem.approvedToDate = new Currency();
    contractItem.claimedToDate = new Currency();
    contractItem.status = PaymentStatus.Approved;
    const contractUpdate = JSON.parse(JSON.stringify(contractItem));
    return contractUpdate;
  }
