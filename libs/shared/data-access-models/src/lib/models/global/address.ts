import { setTypeValues } from "@workspace/shared/util"

export interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  country?: string;
  postcode?: string;
}

export function createAddress(address: Address | undefined): Address {
  const newAddress: Address = {};
  if(address){
    const properties = [
      'line1',
      'line2',
      'city',
      'state',
      'country',
      'postcode',
    ];
    setTypeValues<Address>(address, newAddress, properties);
  }

  return newAddress;
}
