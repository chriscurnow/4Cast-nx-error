import { Address } from '../address';
import { PhoneNumber } from  '../phone';
import { setTypeValues, setValuesArray } from '@workspace/shared/util';
import { createAddress } from '..';
import { createPhoneNumbers} from '..';

export interface CompanyOffice {
  description?: string;
  address?: Address;
  phoneNumbers?: PhoneNumber[];
}

 const properties = ['description'];


export function createOffice(companyOffice: CompanyOffice | undefined): CompanyOffice {

  const newCompanyOffice: CompanyOffice = {};

  if (companyOffice){
     setTypeValues<CompanyOffice>(companyOffice, newCompanyOffice, properties);
     newCompanyOffice.address = createAddress(
       companyOffice ? companyOffice.address : undefined
     );

     newCompanyOffice.phoneNumbers = createPhoneNumbers(companyOffice.phoneNumbers);
  }

  return newCompanyOffice;
}

export function  createOffices(companyOffices: CompanyOffice[] | undefined){
  const newCompanyOffice: CompanyOffice = {};
  return setValuesArray(companyOffices, newCompanyOffice, properties)
  // const newCompanyOffices: CompanyOffice[] = [];
  // if (companyOffices){
  //   companyOffices.forEach(office => {
  //     const newOffice = createOffice(office);
  //     if (newOffice){
  //        newCompanyOffices.push(newOffice)
  //     }
  //   })
  // }
  // return newCompanyOffices;
}
