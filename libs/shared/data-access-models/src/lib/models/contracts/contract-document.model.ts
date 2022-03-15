import { setTypeValues } from "@workspace/shared/util";

export interface ContractDocument {
  id?: string;
  documentNumber?: string;
  name?: string;
  revision?: string;
  date?: Date;
  file?: string;
}

export const documentProps = [
  'id',
  'documentNumber',
  'name',
  'revision',
  'date',
  'file',
];

export function createContractDocument(value: ContractDocument | undefined){
  const newValue: ContractDocument = {};
  if (value){
    setTypeValues<ContractDocument>(value, newValue, documentProps);
  }
  return newValue;
}

export function create(value: ContractDocument | undefined) {
  const newValue: ContractDocument = {};
  if (value) {
    const props = ['id', 'documentNumber', 'name', 'revision', 'date', 'file'];
    setTypeValues(value, newValue, props);
  }
  return newValue;
}
