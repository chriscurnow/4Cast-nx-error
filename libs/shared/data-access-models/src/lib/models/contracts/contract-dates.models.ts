import moment from 'moment';
import { setTypeValues } from '@workspace/shared/util';
export interface ContractDates {
  completedOnSite?: Date | moment.Moment | null | undefined;
  commencement?: Date | moment.Moment | null | undefined;
  completion?: Date | moment.Moment | null | undefined;
  contract?: Date | moment.Moment | null | undefined;
}

const properties = [
  'completedOnSite',
  'commencement',
  'completion',
  'contract',
];
export function createContractDates(contractDates: ContractDates | undefined): ContractDates {
  const newContractDates: ContractDates = {};

  setTypeValues<ContractDates>(contractDates, newContractDates, properties)
  return newContractDates;
}
