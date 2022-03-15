import { CompanyOffice  } from './company-office';
import { Person } from '../person';
import { createOffice, createOffices } from '.';
import { setTypeValue, setTypeValues } from '@workspace/shared/util';
// import { Tenant } from '../../../tenant-classes/tenant';


export interface Company {
  id?: string;
  companyName?: string;
  companyContact?: CompanyContact;
  abn?: string;
  abbreviation?: string;
  code?: string;
  mainOffice?: CompanyOffice;
  offices?: CompanyOffice[];
  companyContacts?: CompanyContact[];
  // tenant: Tenant;
}

export function createCompany(
  company: Company | undefined
): Company {
  const properties = ['id', 'companyName', 'abn', 'abbreviation', 'code'];
  const newCompany: Company = {};
  if(company){
    setTypeValues(company, newCompany, properties);
    newCompany.mainOffice = createOffice(company.mainOffice);
    newCompany.offices = createOffices(company.offices);
  }
  return newCompany;
}




// setOfficesFromData(data: any){
//   if (data.offices) {
//     const offices: CompanyOffice[] = [];
//     data.offices.forEach((office: CompanyOffice) => {
//        offices.push(new CompanyOffice(office))
//     })
//     this.offices = offices;
//   }
// }

// // TODO: Do we need this?
// setContactsFormData(data: any) {
//   if (data.companyContacts) {
//     const contacts: CompanyContact[] = [];
//     data.contacts.forEach((contact: CompanyContact) => {
//       //  contacts.push(new CompanyContact(contact))
//     })
//     this.companyContacts = contacts;
//   }
// }

//   get lowerCaseName() { return this.companyName.toLowerCase}

// }

export interface CompanyContact extends Person {

  company?: Company | undefined;
  trade?: string | undefined;

}

export function createCompanyContact(companyContact: CompanyContact | undefined): CompanyContact {
  const newCompanyContact: CompanyContact = {};
  if (companyContact){
    setTypeValue<CompanyContact>(companyContact, newCompanyContact, 'trade')
    newCompanyContact.company = createCompany(companyContact.company)
  }
  return newCompanyContact
}

