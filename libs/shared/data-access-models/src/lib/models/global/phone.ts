import { setTypeValues, setValuesArray } from "@workspace/shared/util";

export interface PhoneNumber{
  format?: string | null;
  phoneNumber?: string | null;
  phoneName?: string | null;
}

const properties = ['format', 'phoneNumber', 'phoneName'];
const newPhoneNumber: PhoneNumber = {};

export function createPhoneNumber(phoneNumber: PhoneNumber): PhoneNumber {
  setTypeValues<PhoneNumber>(phoneNumber, newPhoneNumber, properties)
  return newPhoneNumber
}

export function createPhoneNumbers(phoneNumbers: PhoneNumber[] | undefined): PhoneNumber[]{
  return setValuesArray<PhoneNumber>(phoneNumbers, newPhoneNumber, properties)
}

