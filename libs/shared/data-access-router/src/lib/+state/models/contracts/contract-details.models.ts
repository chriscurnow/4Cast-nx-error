import {
  ContractTax,
  ContractSecurity} from './miscellaneous-models';
import { ContractDrawing } from './contract-drawing.model';
import { ContractDocument } from './contract-document.model';
import { ContractMilestone } from './contract-milestone.model';
import { ContractTerms } from './contract-terms.model';

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
