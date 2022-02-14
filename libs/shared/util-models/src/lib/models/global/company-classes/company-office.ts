import { Address } from '../address';
import { PhoneNumber } from  '../phone';

export interface CompanyOffice {
  description?: string;
  address?: Address;
  phoneNumbers?: PhoneNumber[];
}

