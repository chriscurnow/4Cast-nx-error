
export interface EmailAddressInterface {
  name?: string;
  address?: string;
}

export class EmailAddress implements EmailAddressInterface {
name?: string;
address?: string;

constructor(data: any) {
  this.name = data.name ? data.name : null;
  this.address = data.address ? data.address : null;
}
}
