

import { SupplierInterface, Supplier } from '../suppliers';
import { CostCode, CostCodeInterface} from '@4cast/classes';
import { Company } from '@4cast/classes';
import { Project, HeadContractor } from '@4cast/classes';
import { FourcastBase } from '@4cast/classes';
import { ContractAmountsInterface, ContractAmounts} from './contract-amounts';
import { ContractAuthorisation, ContractAuthorisationInterface } from './interfaces/authorisation'
import { ContractDetailsInterface, ContractDetails } from './interfaces/contract-details';
import { ContractDatesInterface, ContractDates } from './interfaces/contract-dates';
import { MostRecentPaymentInterface, MostRecentPayment } from './interfaces/most-recent-payment';
import { SubcontractPaymentInterface } from '../payments/payment';
import { Observable } from 'rxjs';







export interface SubcontractProjectInterface {
  id: string;
  name: string;
  projectNumber: string;

}

export class SubcontractProject extends FourcastBase<SubcontractProjectInterface> implements SubcontractProjectInterface {


  id!: string;
  name!: string;
  projectNumber!: string;

  get collectionName(): string {
    return 'subcontract-projects'
  }

 
  constructor(data: SubcontractProjectInterface | undefined | null){
    super();
    if (data) {
      this.assignValue(data, 'id');
      this.assignValue(data, 'name');
      this.assignValue(data, 'projectNumber');
    }
  }
}

export interface SubcontractInterface {
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  number?: number | undefined;
  costCode?: CostCodeInterface;
  supplier?: SupplierInterface;
  isNew?: boolean | undefined;
  isDraft?: boolean | undefined;
  authorisation?: ContractAuthorisationInterface;
  contractDetails?: ContractDetailsInterface;
  dates?: ContractDatesInterface;
  amounts?: ContractAmountsInterface;
  mostRecentPayment?: MostRecentPaymentInterface;
  nextItemNumber?: number | undefined;
  nextPaymentNumber?: number | undefined;
  project?: SubcontractProjectInterface | undefined;

}



export class Subcontract extends FourcastBase<SubcontractInterface> implements SubcontractInterface {

  get collectionName(): string {
    return 'subcontracts'
  }

  static companyId = '';
  static projectId = '';
  static projectCollectionName = 'projects'



    id!: string;
    name!: string | undefined;
    description: string | undefined;
    number: number | undefined;
    costCode!: CostCode;
    isNew: boolean | undefined;
    isDraft: boolean | undefined;
    authorisation: ContractAuthorisationInterface;
    contractDetails: ContractDetails;
    dates: ContractDates;
    amounts: ContractAmounts;
    supplier?: Supplier;
    mostRecentPayment: MostRecentPaymentInterface;
    nextItemNumber: number | undefined;
    nextPaymentNumber: number | undefined;
    payments!: Observable<SubcontractPaymentInterface[]>;
    project?: SubcontractProject | undefined;

    static createSubcontractWithSupplierId(supplierId: string): Subcontract{
      const supplier = new Supplier({id: supplierId});
      const subcontract = new Subcontract({supplier: supplier});
      return subcontract;
    }

    constructor(data?: SubcontractInterface | null | undefined) {
      super();
      // const methodName = 'Subcontract Constructor';

      if (data) {
        this.assignValue(data, 'id');
        this.assignValue(data, 'parentId');
        this.assignValue(data, 'isNew');
        this.assignValue(data, 'isDraft');
        this.assignValue(data, 'subcontractNumber');
        this.assignValue(data, 'nextItemNumber');
        this.assignValue(data, 'nextPaymentNumber');
        this.assignValue(data, 'description');
        this.assignValue(data, 'costCodeId');
        this.project = new SubcontractProject(data.project);
        this.authorisation = new ContractAuthorisation(data.authorisation);
        this.contractDetails = new ContractDetails(data.contractDetails);
        this.dates = new ContractDates(data.dates);
        this.amounts = new ContractAmounts(data.amounts);
        this.supplier = new Supplier(data.supplier);
        this.mostRecentPayment = new MostRecentPayment(data.mostRecentPayment);


        // TODO: [FCNG-347] Fill out remaining property assignments in Subcontract class definition
      } else {
        this.authorisation = new ContractAuthorisation();
        this.contractDetails = new ContractDetails();
        this.dates = new ContractDates();
        this.amounts = new ContractAmounts();
        this.mostRecentPayment = new MostRecentPayment();

      }
    }

    static createNew(data: SubcontractInterface): Subcontract {
      const newSubcontract = new Subcontract(data);
      newSubcontract.dates = new ContractDates();
      newSubcontract.dates.contract = new Date();
      newSubcontract.isNew = true;
      newSubcontract.isDraft = true;
      return newSubcontract;
    }

    collectionPath(companyId: string, projectId: string): string {
      const projectsCollectionName = 'projects'; // TODO: [FCSUB-378] get projects collection name from Project
      const contractsCollectionName = this.collectionName;
      const companyCollectionName = 'companies'; // TODO: [MC-4] fix get collectionName in Company class
      const path = `${companyCollectionName}/${companyId}/${projectsCollectionName}/${projectId}/${contractsCollectionName}`;
      return path;
      }

      

    createEmptyProject(): Project {
      // project must have some value to allow 'valuesOnly' to work
      const project = new Project(null);
      project.id = '';
      project.headContractor = new HeadContractor();
      project.headContractor.id = '';
      return project;
    }







    get formValues(): FormValuesInterface {
      return {
        id: this.id ? this.id : null,
        amounts: this.amounts ? this.amounts.valuesOnly as ContractAmounts : null,
        dates: this.dates ? this.dates.formValues : null
      };

    }



  //   get valuesOnly(): SubcontractInterface {

  //     return {
  //       id: this.id,
  //       isDraft: this.isDraft ? this.isDraft : null,
  //       name: null,
  //       description: null,

  //       isNew: this.isNew ? this.isNew : null,
  //       dates: this.dates ? this.dates.valuesOnly : null,
  //       amounts: this.amounts ? this.amounts.valuesOnly : null,
  //       nextItemNumber: this.nextItemNumber ? this.nextItemNumber : null,
  //       nextPaymentNumber: this.nextPaymentNumber ? this.nextPaymentNumber : null,

  //       // we don't have a 'valuesOnly' property for each of the following
  //       // we are probably going to stop using the 'valuesOnly' requirement
  //       // so we won't bother fixing this just now
  //       // just assign them to null so we don't get any errors.
  //       contractDetails : null,
  //       authorisation:  null,
  //       mostRecentPayment: null,


  //     };

  //   }
  }

  interface FormValuesInterface {
      id: string | null,
      amounts: ContractAmounts | null,
      dates: ContractDatesInterface | null
  }



  // interface DatesFormValues {
  //   contract: moment.Moment | null,
  //   commencement: moment.Moment | null,
  //   completion: moment.Moment | null,


  // }

// function log(method: string, info: string, data: any){
//     console.log('');
//     console.log('============================================================');
//     console.log(`SUBCONTRACT Class ${method}`);
//     console.log(`${info}`, data);
//     console.log(`End ${method}`);
//     console.log('============================================================');
//     console.log('\r\r');
//   }
