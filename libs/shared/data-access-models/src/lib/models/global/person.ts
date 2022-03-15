import { PhoneNumber } from '.';
import { EmailAddress } from '.';
import { setValues } from '@workspace/shared/util';

export interface Person {

  id?: string | undefined;
  familyName?: string;
  givenName?: string;
  preferredName?: string;
  concatName?: string;
  phoneNumbers?: PhoneNumber[];
  emailAddresses?: EmailAddress[];
  preferredPhone?: PhoneNumber;
  preferredEmail?: EmailAddress;

}

export function createPerson(person: Person | undefined): Person {
  const newPerson: Person = {};
  const properties = ['id', 'familyName', 'givenName', 'preferredName', 'concateName']
  if(person){
    setValues(person, newPerson, properties);
  }


  return newPerson;
}





