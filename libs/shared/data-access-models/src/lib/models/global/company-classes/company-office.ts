import { Address } from '../address';
import { PhoneNumber } from  '../phone';
import { setTypeValues } from '@workspace/shared/util';
import { createAddress } from '..';
import { createPhoneNumbers} from '..';

export interface CompanyOffice {
  description?: string;
  address?: Address;
  phoneNumbers?: PhoneNumber[];
}

export function createOffice(companyOffice: CompanyOffice | undefined): CompanyOffice {
  const properties = ['description'];
  const newCompanyOffice: CompanyOffice = {};
  if (companyOffice){
     setTypeValues(companyOffice, newCompanyOffice, properties);
     newCompanyOffice.address = createAddress(
       companyOffice ? companyOffice.address : undefined
     );

     newCompanyOffice.phoneNumbers = createPhoneNumbers(companyOffice.phoneNumbers);
  }

  return newCompanyOffice;
}

export function  createOffices(companyOffices: CompanyOffice[] | undefined){
  const newCompanyOffices: CompanyOffice[] = [];
  if (companyOffices){
    companyOffices.forEach(office => {
      const newOffice = createOffice(office);
      if (newOffice){
         newCompanyOffices.push(newOffice)
      }
    })
  }
  return newCompanyOffices;
}
