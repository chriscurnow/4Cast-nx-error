export interface PhoneNumberInterface {
  format?: string | null;
  phoneNumber?: string | null;
  phoneName?: string | null;
}



export class PhoneNumber implements PhoneNumberInterface {
  format?: string | null;
  phoneNumber?: string | null;
  phoneName?: string | null;

  constructor(data: PhoneNumberInterface) {
    this.format = data.format ? data.format : null;
    this.phoneNumber = data.phoneNumber ? data.phoneNumber : null;
    this.phoneName = data.phoneName ? data.phoneName : null;
  }
}
