/* eslint-disable no-prototype-builtins */
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormGroup, AbstractControl } from '@angular/forms';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import { Subcontract } from '@workspace/shared/data-access-models';

import { Observable, Subject } from 'rxjs';
// import { PaymentStatus } from '../payments';


export type ContractItemDoc = AngularFirestoreDocument<SubcontractItem>;
export type ContractItemsCollection = AngularFirestoreCollection<SubcontractItem>;

@Injectable({
  providedIn: 'root'
})
export class SubcontractItemsService {

  docPath = '';
  contractItemsCollection!: AngularFirestoreCollection<SubcontractItem>;
  contractItems!: Observable<SubcontractItem[]>;

  contractItemDoc!: AngularFirestoreDocument<SubcontractItem>


  collectionChangedSource = new Subject<ContractItemsCollection>();
  collectionChanged$ = this.collectionChangedSource.asObservable();


  constructor(private afs: AngularFirestore) { }



  getCollectionPath(projectId: string, subcontractId: string): string {
    const projectPath = `projects/${projectId}`
    const subcontractPath = `subcontracts/${subcontractId}`; // TODO: [SL-15] use generic method to get subcontract path
    const contractItemsPath = ''; // (new SubontractItem()).collectionName; // TODO: [SL-17] find better way to define contractItemsPath
    return `${projectPath}/${subcontractPath}/${contractItemsPath}`
  }


  async createNewItem(projectId: string, subcontractId: string): Promise<any> {

    // const newContractItem = new SubcontractItem({
    //   subcontractId,
    //   status: PaymentStatus.New});

    // const path = this.getCollectionPath(projectId, subcontractId)
    // const newItem = newContractItem.valuesOnly;
    // // const newVariation = new SubcontractVariation(newData);
    // try {
    //   const ref = await this.afs.collection(path).add(newItem);
    //   return ref;
    // } catch (err) {
    //   return err;
    // }
    }


/**
 *
 * @param projectId
 * @param subcontractId
 *
 * Retrieves contract items for subcontract
 */
  getContractItems(subcontractId: string): Observable<SubcontractItem[]>{
    const path = 'subcontractItems'; // TODO: [SL-16] implement method to get contract item path
    // ContractItem.getCollectionPath(projectId, subcontractId);
    // this.contractItemsCollection =
    return this.afs.collection<SubcontractItem>(path, ref => ref
    .where('subcontract.id', '==', subcontractId)
    .where('itemNumber', '>=', 0)
    .orderBy('itemNumber'))
    .valueChanges()


    // this.announceCollectionChange(this.contractItemsCollection);
    // return this.contractItemsCollection;
    // rather than return the observable, return the collection reference so we can use it again.
  }

getContractItem(itemId: string ): Observable<SubcontractItem | undefined> {

    // TODO: [FCSUB-464] [FCSUB-463] Use generic getDocument from DataService
    this.contractItemDoc = this.afs.doc<SubcontractItem>(`contractItems/${itemId}`);
    const contractItem = this.contractItemDoc.valueChanges();
    return contractItem;

}

announceCollectionChange(collection: ContractItemsCollection): void{
  this.collectionChangedSource.next(collection);
}



// async cancelContractItem(item: SubcontractItem ): Promise < any > {
//     if (item.isNew) {

//       try {
//         const response = await itemDoc.delete();
//         return ({ ok: true, error: null });
//       } catch (err) {
//         return ({ ok: false, error: err });
//       }

//     } else {
//       return Promise.resolve(null);
//     }
//   }

// [FCSUB-359] Create delete contract Item method
  async deleteContractItem(itemDoc: ContractItemDoc ): Promise<any> {
    try {
      await itemDoc.delete();
      return ({ ok: true, error: null });
    } catch (err) {
      return ({ ok: false, error: err });
    }
  }

async saveNewItem(itemData: SubcontractItem, projectId: string, subcontractId: string): Promise < DocumentReference <SubcontractItem>> {
  // TODO: [FCSUB-465] Fix saveNewItem
    const collectionPath = this.getCollectionPath(projectId, subcontractId);
    const response = await this.afs.collection<SubcontractItem>(collectionPath).add(itemData);
    return response;
  }




saveItemFromForm(contractItemForm: FormGroup,
                 contractItemDoc: ContractItemDoc,
                 status: number): any {

    const update: any = {};

    const formValue = contractItemForm.value;
    const controls = contractItemForm.controls;
    const controlKeys = Object.keys(controls);

    controlKeys.forEach(key => {
      const control: AbstractControl = controls[key];

      switch (true) {

        case control.pristine:
          // don't do anything. no change in the value;
          break;
        case !formValue[key]:
          // don't do anything, the value is not defined
          break;
        case (formValue[key].hasOwnProperty('valuesOnly')):
          update[key] = formValue[key].valuesOnly;
          break;
        case (formValue[key].hasOwnProperty('_isAMomentObject')):
          update[key] = formValue[key].toDate();
          break;
        default:
          update[key] = formValue[key];
      }
    });

    update.isNew = false; // at least one value must change in order to fire the trigger;
    update.status = status;
    console.log('CONTRACT ITEMS SERVICE saveItemFromForm', update)

    return contractItemDoc.update(update);


  }
}
