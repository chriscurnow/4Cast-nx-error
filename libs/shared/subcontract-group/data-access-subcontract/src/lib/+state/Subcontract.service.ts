import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subcontract } from '@workspace/shared/data-access-models';

@Injectable({
  providedIn: 'root',
})
export class SubcontractService {
  constructor(private afs: AngularFirestore) {}
  // 246A06AEBC2345478A6301D3A6490B0E - BP Plumbing
  // 002F048BCAAF4BACB94FF5BBE99C123B - BOSS Constructions
  // afs.collection('items', ref => ref.where('size', '==', 'large'))
  getContractsList() {
    return this.afs
      .collectionGroup<Subcontract>('subcontracts', (ref) =>
        ref.where('supplier.id', '==', '246A06AEBC2345478A6301D3A6490B0E')
      )
      .valueChanges()
      .pipe(
        map((contracts) => {
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
          if (contract) {
            return contract;
          } else {
            return { id: '' };
          }
        })
      );
  }
}
