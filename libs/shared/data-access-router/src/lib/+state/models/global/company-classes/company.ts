import { CompanyOffice  } from './company-office';
import { Person } from '../person';
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

  company: Company | undefined;
  trade: string | undefined;

}

