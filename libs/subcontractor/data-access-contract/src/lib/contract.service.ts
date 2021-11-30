import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contract } from '..';

@Injectable({
  providedIn: 'root'
})
export class ContractService {



  constructor(private afs: AngularFirestore) {
  }

  getContracts() {
    return this.afs.collection<Contract>('subcontracts').valueChanges()
    .pipe(map(contracts => {
      console.log(contracts);
      return contracts;
    }))
  }
}
