import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Subcontract } from '@workspace/shared/data-access-models';

@Injectable({
  providedIn: 'root',
})
export class SubcontractService {
  constructor(private afs: AngularFirestore) {}

  // afs.collection('items', ref => ref.where('size', '==', 'large'))
  getContractsList() {
    return this.afs
      .collection<Subcontract>('subcontracts', (ref) =>
        ref.where('supplier.id', '==', '246A06AEBC2345478A6301D3A6490B0E')
      )
      .valueChanges()
      .pipe(
        map((contracts) => {
          console.log('CONTRACT SERVICE', contracts);
          return contracts;
        })
      );
  }

  getContract(id: string | null) {
    const path = `subcontracts/${id}`;
    return this.afs
      .doc<Subcontract>(path)
      .valueChanges()
      .pipe(
        map((contract) => {
          if(contract){
            console.log('CONTRACT SERVICE get contract', contract);
            return contract;
          } else {
            return {id: ''};
          }

        })
      );
  }
}
