import { Person } from '../';
import { Supplier } from './supplier';

export interface SupplierContact extends Person {

  supplier: Supplier | undefined;
  trade: string | undefined;

}


