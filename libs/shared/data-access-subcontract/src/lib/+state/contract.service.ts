import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contract } from '..';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private afs: AngularFirestore) {}

  // afs.collection('items', ref => ref.where('size', '==', 'large'))
  getContracts() {
    return this.afs
      .collection<Contract>('subcontracts', (ref) =>
        ref.where('supplier.id', '==', '246A06AEBC2345478A6301D3A6490B0E')
      )
      .valueChanges()
      .pipe(
        map((contracts) => {
          console.log('CONTRACT SERVICE',contracts);
          return contracts;
        })
      );
  }

  getContract(id: string | null) {
    const path = `subcontracts/${id}`;
    return this.afs.doc<Contract>(path)
    .valueChanges()
    .pipe(
      map(contract => {
        console.log('CONTRACT SERVICE get contract', contract);
        return contract;
      })
    )
  }
}
