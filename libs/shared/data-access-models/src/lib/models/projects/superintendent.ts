

import { Address } from '..'

// TODO: [DEV-50] Superintendant should extend Company
export interface Superintendent {
    id?: string;
    companyName?: string;
    address?: Address | undefined;
    // people: ProjectContactInterface[]
  }



