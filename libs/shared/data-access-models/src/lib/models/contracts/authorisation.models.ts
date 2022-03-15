import { setTypeValues } from "@workspace/shared/util";
import { createPerson, Person } from "..";

export interface ContractAuthorisation {
  details?: string;
  isConfirmed?: boolean;
  timestamp?: number;
  user?: Person;
}

export function createContractAuth(auth: ContractAuthorisation | undefined ){
  const newAuth: ContractAuthorisation = {};
  if(auth){
    const props = ['details', 'isConfirmed', 'timestamp'];
    setTypeValues <ContractAuthorisation>(auth, newAuth, props);
    newAuth.user = createPerson(auth.user);
  }
  return newAuth;
}
