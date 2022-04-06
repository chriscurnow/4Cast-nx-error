import {
  ContractTax,
  ContractSecurity} from './miscellaneous-models';
import { ContractDrawing, drawingProps } from './contract-drawing.model';
import { ContractDocument, documentProps } from './contract-document.model';
import { ContractMilestone } from './contract-milestone.model';
import { ContractTerms } from './contract-terms.model';
import { setTypeValues, setValuesArray } from '@workspace/shared/util';

export interface ContractDetails {
  tax?: ContractTax;
  security?: ContractSecurity;
  drawings?: ContractDrawing[];
  documents?: ContractDocument[];
  scope?: string;
  program?: string;
  specifications?: string;
  milestones?: ContractMilestone[];
  terms?: ContractTerms;
}

export function createContractDetails(details: ContractDetails | undefined){
  const newDetails: ContractDetails = {};
  const drawings: ContractDrawing[] = [];
  const newDrawing: ContractDrawing = {};
  const newDocuments: ContractDocument[] = [];
  const newDocument: ContractDocument = {};

  if (details){
    const props = ['scope', 'program', 'specifications'];
    setTypeValues<ContractDetails>(details, newDetails, props);
    newDetails.drawings = setValuesArray<ContractDrawing>(
      drawings,
      newDrawing,
      drawingProps
    );
    newDetails.documents = setValuesArray<ContractDocument>(
      newDocuments,
      newDocument,
      documentProps
    );
  }
  return newDetails
}
