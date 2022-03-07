import { Currency } from '@workspace/shared/util'


import * as moment from 'moment';
import { Subcontract } from './subcontract';
import { PaymentStatus } from '../payments';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';


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

export interface SubcontractItemEntity extends EntityState<ContractItem> {
  // additional entities state properties
  selectedContractItemId: string | null;
}

export function selectContractItemId(a: Subcontract): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByNumber(a: ContractItem, b: ContractItem): number {
  if (a.itemNumber && b.itemNumber && a.itemNumber > b.itemNumber) {
      return 1;
    } else {
      return 0
    }
}

export const subcontractAdapter: EntityAdapter<Subcontract> =
  createEntityAdapter<Subcontract>({
    selectId: selectContractItemId,
    sortComparer: sortByNumber,
  });

export function createItemForApprovedContract(subcontract: Subcontract): any {
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
