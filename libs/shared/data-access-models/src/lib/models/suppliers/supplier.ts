import { setTypeValues } from '@workspace/shared/util';
import { Company  } from '..';

export interface Supplier extends Company {
  isSupplier?: boolean;
}

export function createSupplier(supplier: Supplier | undefined){

  const newSupplier = {};
  if(supplier){
    // newSupplier = createCompany(supplier);
    const properties = ['isSupplier'];
    setTypeValues<Supplier>(supplier, newSupplier, properties)
  }




  return newSupplier;
}


