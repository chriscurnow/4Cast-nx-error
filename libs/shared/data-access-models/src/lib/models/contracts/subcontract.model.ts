// TODO: [NX-31] fix import errors
// import { Supplier } from '../suppliers';
// import { CostCode } from '@4cast/classes';
// import { Company } from '@4cast/classes';
// import { Project, HeadContractorEntity } from '@4cast/classes';

import { Project } from '..';
import { ContractAmounts } from './contract-amounts';
import {
  ContractAuthorisation,
} from './authorisation.models';
import {
  ContractDetails
} from './contract-details.models';
import {
  ContractDates
} from './contract-dates.models';
import {
  MostRecentPayment
} from './most-recent-payment';
import { Payment } from '../payments/payment.model';
import { SubcontractHeadContractorEntity } from '.';

export interface Supplier {
  id: string;
}

export interface CostCode {
  id: string;
}

export interface Company {
  id: string;
}

// export interface Project {
//   id: string;
//   headContractor: SubcontractHeadContractorEntity
// }




// export interface SubcontractProject {
//   id: string;
//   name: string;
//   projectNumber: string;
// }


const subcontractCollectionName = 'subcontracts';

export interface SubcontractEntity {
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

import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface SubcontractEntity extends EntityState<SubcontractEntity> {
  // additional entities state properties
  selectedContractId: string | null;
}

export function selectSubcontractId(a: SubcontractEntity): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: SubcontractEntity, b: SubcontractEntity): number {
  let aName = a.name;
  let bName = b.name;

  if(!aName){aName = ''};
  if(!bName){bName = ''};
  return aName.localeCompare(bName);
}
export const adapter: EntityAdapter<SubcontractEntity> = createEntityAdapter<SubcontractEntity>({
  selectId: selectSubcontractId,
  sortComparer: sortByName,
});

// export function createSubcontractWithSupplierId(supplierId: string): SubcontractEntity {
//     const supplier = { id: supplierId };
//     const subcontract: SubcontractEntity = {id: ''} // new SubcontractEntity({ supplier: supplier });
//     subcontract.supplier = supplier;
//     return subcontract;
//   }


//   export function createNew(data: SubcontractEntity): SubcontractEntity {
//     // TODO: [NX-30] Create method to create subcontract from data
//     const newSubcontract: SubcontractEntity = {id:''};
//     // TODO: [NX-29] create method to create new ContractDates
//     newSubcontract.dates = {} //new ContractDates();
//     newSubcontract.dates.contract = new Date();
//     newSubcontract.isNew = true;
//     newSubcontract.isDraft = true;
//     return newSubcontract;
//   }

  export function collectionPath(companyId: string, projectId: string): string {
    const projectsCollectionName = 'projects'; // TODO: [FCSUB-378] get projects collection name from Project
    const contractsCollectionName = subcontractCollectionName;
    const companyCollectionName = 'companies'; // TODO: [MC-4] fix get collectionName in Company class
    const path = `${companyCollectionName}/${companyId}/${projectsCollectionName}/${projectId}/${contractsCollectionName}`;
    return path;
  }

  // export function createEmptyProject(): Project {
  //   // project must have some value to allow 'valuesOnly' to work
  //   const project = {id: ''};
  //   project.id = '';
  //   project.headContractor = { id: '' };

  //   return project;
  // }



 export interface FormValues {
  id: string | null;
  amounts: ContractAmounts | null;
  dates: ContractDates | null;
}
