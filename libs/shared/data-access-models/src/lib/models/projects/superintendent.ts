
import { setTypeValues } from '@workspace/shared/util'
import { Address, createAddress } from '..'

// TODO: [DEV-50] Superintendant should extend Company
export interface Superintendent {
    id?: string;
    companyName?: string;
    address?: Address | undefined;
    // people: ProjectContactInterface[]
  }

  export function createSuperintendant(superintendant: Superintendent | undefined): Superintendent{
    const properties = ['id', 'companyName'];
    const newSuperintendent: Superintendent = {};
    setTypeValues<Superintendent>(superintendant, newSuperintendent, properties);
    newSuperintendent.address = createAddress(superintendant ? superintendant.address : undefined)
    return newSuperintendent
  }


