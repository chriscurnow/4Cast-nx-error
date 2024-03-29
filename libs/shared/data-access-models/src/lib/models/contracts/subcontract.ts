

import {
  Supplier,
  CostCode,
  Project,
  ContractAmounts,
  ContractAuthorisation,
  ContractDates,
  MostRecentPayment,
  ContractDetails,
  createCostCode,
  createSupplier,
  createContractDetails,
  createContractDates,
  createProject
} from '..';

import { setTypeValues } from '@workspace/shared/util';

import { EntityState } from '@ngrx/entity';
import { createContractAuth, createMostRecentPayment } from '.';



export interface Subcontract {
  id?: string;
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

export function createSubcontract(subcontract: Subcontract | undefined){
  const newSubcontract: Subcontract = {};
  if (subcontract){
    const properties = ['id', 'name', 'number', 'isNew', 'isDraft', 'nextItemnumber', 'nextPaymentNumber'];
    setTypeValues<Subcontract>(subcontract, newSubcontract, properties);
    newSubcontract.costCode = createCostCode(subcontract.costCode);
    newSubcontract.supplier = createSupplier(subcontract.supplier);
    newSubcontract.authorisation = createContractAuth(subcontract.authorisation);
    newSubcontract.contractDetails = createContractDetails(subcontract.contractDetails);
    newSubcontract.dates = createContractDates(subcontract.dates);
    newSubcontract.amounts = subcontract.amounts;
    newSubcontract.mostRecentPayment = createMostRecentPayment(subcontract.mostRecentPayment);
    newSubcontract.project = createProject(subcontract.project);
  }
  return newSubcontract;
}



