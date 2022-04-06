import { PhoneNumber } from '.';
import { EmailAddress } from '.';
import { setTypeValues } from '@workspace/shared/util';

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
  const properties = ['id', 'familyName', 'givenName', 'preferredName', 'concatName']
  if(person){
    setTypeValues<Person>(person, newPerson, properties);
  }


  return newPerson;
}





