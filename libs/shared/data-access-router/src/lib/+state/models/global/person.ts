import { PhoneNumber } from './';
import { EmailAddress } from './';

export interface Person {

  id: string | undefined;
  familyName: string;
  givenName: string;
  preferredName: string;
  phoneNumbers: PhoneNumber[];
  emailAddresses: EmailAddress[];
  preferredPhone: PhoneNumber;
  preferredEmail: EmailAddress;

}





