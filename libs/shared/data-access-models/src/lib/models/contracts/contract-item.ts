import { createCurrency, Currency } from '@workspace/shared/util'


// import * as moment from 'moment';
import { Subcontract } from './subcontract';
import { PaymentStatus } from '../payments';
// import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';


export interface SubcontractItem {
  id?: string;
  isNew?: undefined;
  isDraft?: undefined;
  itemDate?: Date | string;
  itemNumber?: number;
  title?: string;
  details?: string;
  contractAmount?: Currency;
  claimedToDate?: Currency;
  approvedToDate?: Currency;
  claimedPercent?: number;
  approvedPercent?: number;
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

// export interface SubcontractItemEntityState extends EntityState<SubcontractItem> {
//   // additional entities state properties
//   selectedContractItemId: string;
//   loaded: boolean;
//   error: any;
// }

// export function selectContractItemId(a: SubcontractItem): string | undefined {
//   //In this case this would be optional since primary key is id
//   return a.id;
// }

// export function sortByNumber(a: SubcontractItem, b: SubcontractItem): number {
//   if (a.itemNumber && b.itemNumber && a.itemNumber > b.itemNumber) {
//       return 1;
//     } else {
//       return 0
//     }
// }

// export const subcontractItemAdapter: EntityAdapter<SubcontractItem> =
//   createEntityAdapter<SubcontractItem>({
//     sortComparer: sortByNumber,
//   });

export function createItemForApprovedContract(subcontract: Subcontract): any {
    const contractItem: SubcontractItem = {
      id: undefined,
      isNew: undefined,
  isDraft: undefined,
  itemDate: undefined,
  itemNumber: undefined,
  title: undefined,
  details: undefined,
  contractAmount: undefined,
  claimedToDate: undefined,
  approvedToDate: undefined,
  claimedPercent: undefined,
  approvedPercent: undefined,
  amountRemaining: undefined,
  subcontractorRef: undefined,
  contractorRef: undefined,
  status: undefined,
  subcontractId: undefined,
  projectId: undefined,
    };
    if (subcontract.amounts) {
      if (subcontract.amounts.contractOriginal) {
        contractItem.contractAmount = createCurrency(
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
    contractItem.approvedToDate = createCurrency();
    contractItem.claimedToDate = createCurrency();
    contractItem.status = PaymentStatus.Approved;
    const contractUpdate = JSON.parse(JSON.stringify(contractItem));
    return contractUpdate;
  }
