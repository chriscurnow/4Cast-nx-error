import { setValues } from "@workspace/shared/util";

export interface PhoneNumber{
  format?: string | null;
  phoneNumber?: string | null;
  phoneName?: string | null;
}

export function createPhoneNumber(phoneNumber: PhoneNumber): PhoneNumber {
  const newPhoneNumber: PhoneNumber = {};
  const properties = ['format', 'phoneNumber', 'phoneName']
  setValues(phoneNumber, newPhoneNumber, properties)
  return newPhoneNumber
}

export function createPhoneNumbers(phoneNumbers: PhoneNumber[] | undefined): PhoneNumber[]{
  const newPhoneNumbers: PhoneNumber[] = [];
  if (phoneNumbers) {
    phoneNumbers.forEach(pNumber => {
      newPhoneNumbers.push(createPhoneNumber(pNumber))
    })
  }
  return newPhoneNumbers
}
// export class PhoneNumber implements PhoneNumberInterface {
//   format?: string | null;
//   phoneNumber?: string | null;
//   phoneName?: string | null;

//   constructor(data: PhoneNumberInterface) {
//     this.format = data.format ? data.format : null;
//     this.phoneNumber = data.phoneNumber ? data.phoneNumber : null;
//     this.phoneName = data.phoneName ? data.phoneName : null;
//   }
// }
