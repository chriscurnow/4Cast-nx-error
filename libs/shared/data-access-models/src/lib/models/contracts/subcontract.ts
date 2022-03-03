

import {
  Supplier,
  CostCode,
  Project,
  ContractAmounts,
  ContractAuthorisation,
  ContractDates,
  MostRecentPayment,
  ContractDetails
} from '..';

import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';



export interface Subcontract {
  id: string;
  name?: string | undefined;
  description?: string | undefined;
  number?: number | undefined;
  costCode?: CostCode;
  supplier?: Supplier;
  isNew?: boolean | undefined;
  isDraft?: boolean | undefined;
  authorisation?: ContractAuthorisation;
  contractDetails?: ContractDetails;
  dates?: ContractDates;
  amounts?: ContractAmounts;
  mostRecentPayment?: MostRecentPayment;
  nextItemNumber?: number | undefined;
  nextPaymentNumber?: number | undefined;
  project?: Project | undefined;

}

export interface SubcontractEntity extends EntityState<Subcontract> {
  // additional entities state properties
  selectedContractId: string | null;
}

export function selectContractId(a: Subcontract): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: Subcontract, b: Subcontract): number {
  if(a.name && b.name ){
  return a.name.localeCompare(b.name);
  } else  {
    return 0
  }
}

export const subcontractAdapter: EntityAdapter<Subcontract> = createEntityAdapter<Subcontract>({
  selectId: selectContractId,
  sortComparer: sortByName,
});



// function log(method: string, info: string, data: any){
//     console.log('');
//     console.log('============================================================');
//     console.log(`SUBCONTRACT Class ${method}`);
//     console.log(`${info}`, data);
//     console.log(`End ${method}`);
//     console.log('============================================================');
//     console.log('\r\r');
//   }
