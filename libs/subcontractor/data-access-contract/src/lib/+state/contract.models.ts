/**
 * Interface for the 'Contract' data
 */
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';


export interface Contract{
  id: string; // Primary ID
  name: string;
  description: string;
}

export interface ContractEntity extends EntityState<Contract> {
  // additional entities state properties
  selectedContractId: string | null;
}

export function selectContractId(a: Contract): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: Contract, b: Contract): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<Contract> = createEntityAdapter<Contract>({
  selectId: selectContractId,
  sortComparer: sortByName,
});
