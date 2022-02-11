

import {
  Supplier,
  CostCode,
  Project,
  ContractAmounts,
  ContractAuthorisation,
  ContractDates,
  MostRecentPayment,
  ContractDetails
} from '../';



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


// function log(method: string, info: string, data: any){
//     console.log('');
//     console.log('============================================================');
//     console.log(`SUBCONTRACT Class ${method}`);
//     console.log(`${info}`, data);
//     console.log(`End ${method}`);
//     console.log('============================================================');
//     console.log('\r\r');
//   }
