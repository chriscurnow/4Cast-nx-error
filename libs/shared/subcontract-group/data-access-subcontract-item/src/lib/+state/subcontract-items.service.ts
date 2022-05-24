/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
  AngularFirestoreDocument,
  AngularFirestoreCollection,

} from '@angular/fire/compat/firestore';
import { map, mergeAll } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { DateUtilsService } from '@workspace/shared/util';
import { FormGroup, AbstractControl } from '@angular/forms';
import { SubcontractItem } from '@workspace/shared/data-access-models';
import { Subcontract } from '@workspace/shared/data-access-models';
import { CurrencyClass } from '@workspace/shared/util';
import { Observable, Subject, of, from} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PaymentStatus } from '@workspace/shared/data-access-models';

export type ContractItemDoc = AngularFirestoreDocument<SubcontractItem>;
export type ContractItemsCollection =
  AngularFirestoreCollection<SubcontractItem>;

interface DateTimestamp {
  seconds: number;
  nanoseconds: number;
}

@Injectable({
  providedIn: 'root',
})
export class SubcontractItemsService {
  docPath = '';
  contractItemsCollection!: AngularFirestoreCollection<SubcontractItem>;
  contractItems!: Observable<SubcontractItem[]>;

  contractItemDoc!: AngularFirestoreDocument<SubcontractItem>;

  collectionChangedSource = new Subject<ContractItemsCollection>();
  collectionChanged$ = this.collectionChangedSource.asObservable();

  constructor(private afs: AngularFirestore,
              private dateUtils: DateUtilsService) {}

  getCollectionPath(projectId: string, subcontractId: string): string {
    const projectPath = `projects/${projectId}`;
    const subcontractPath = `subcontracts/${subcontractId}`; // TODO: [SL-15] use generic method to get subcontract path
    const contractItemsPath = ''; // (new SubontractItem()).collectionName; // TODO: [SL-17] find better way to define contractItemsPath
    return `${projectPath}/${subcontractPath}/${contractItemsPath}`;
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

  async createVariation(subcontract: Subcontract): Promise<any> {
    const projectId = subcontract.project ? subcontract.project.id : '';
    const subcontractId = subcontract.id;
    const variation = this.createItemForApprovedContract(
      subcontract,
      'variation',
      1
    );
    const path = `projects/${projectId}/subcontracts/${subcontractId}/subcontractItems`;
    try {
      const ref = await this.afs
        .collection<SubcontractItem>(path)
        .add(variation);

      return ref;
    } catch (err) {
      return err;
    }
  }

  async createSubcontractItem(item: SubcontractItem): Promise<any> {
    const projectId = item.projectId;
    const subcontractId = item.subcontractId;
    const path = `projects/${projectId}/subcontracts/${subcontractId}/subcontractItems`;
    try {
      const ref = await this.afs.collection(path).add(item);

      return ref;
    } catch (err) {
      return err;
    }
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

  createNewSubcontractItem(
    projectId: string,
    subcontractId: string
  ): Observable<SubcontractItem | undefined > {
    const item: SubcontractItem = {
      isNew: true,
      isDraft: true,
      projectId,
      subcontractId,
    };
    const path = `projects/${projectId}/subcontracts/${subcontractId}/subcontractItems`;
    try {
      // create the item on the backend and wait for the result
      const docRef$ = from( this.afs.collection<SubcontractItem>(path).add(item));

      // process return result from backend
      return docRef$
        .pipe(switchMap ((docRef) => {
          return this.afs.doc<SubcontractItem>(docRef)
          .valueChanges()
            .pipe(map((item: SubcontractItem | undefined) => {
              if(item){
                // item.itemDate = this.dateUtils.setDateFromTimestamp(item.itemTimestamp);
                // item.itemTimestamp = undefined;
              }
              //  console.log('SUBCONTRACT ITEMS SERVICE returning new item after date', item)
              return item;
            }))
          }
        ))
    } catch (err: any) {
      return err;
    }
  }


  test() {
    function myPromise(val: string) {
      return new Promise((resolve) => resolve(`${val} World From Promise!`));
    }
  }

  /**
   *
   * @param projectId
   * @param subcontractId
   *
   * Retrieves contract items for subcontract
   */
  getItemsForSubcontract(subcontractId: string): Observable<SubcontractItem[]> {
    // ContractItem.getCollectionPath(projectId, subcontractId);
    // this.contractItemsCollection =
    // const projectId = subcontract.project?.id;
    // const subcontractId = subcontract.id;
    // const path = `projects/${projectId}/subcontracts/${subcontractId}/subcontractItems`; // TODO: [SL-16] implement method to get contract item path
    return this.afs
      .collectionGroup<SubcontractItem>('subcontractItems', (ref) =>
        ref
          .where('subcontractId', '==', subcontractId)
          .where('itemNumber', '>=', 0)
          .orderBy('itemNumber')
      )
      .valueChanges();

    // this.announceCollectionChange(this.contractItemsCollection);
    // return this.contractItemsCollection;
    // rather than return the observable, return the collection reference so we can use it again.
  }

  getSubcontractItem(itemId: string): Observable<SubcontractItem> {
    // TODO: [FCSUB-464] [FCSUB-463] Use generic getDocument from DataService

    const path = `contractItem/${itemId}`;
    return this.afs
      .doc<SubcontractItem>(path)
      .valueChanges()
      .pipe(
        map((subcontractItem: SubcontractItem | undefined) => {
          if (subcontractItem) {
            return subcontractItem;
          } else {
            return { id: '' };
          }
        })
      );

    // this.contractItemDoc = this.afs.doc<SubcontractItem>(
    //   `contractItems/${itemId}`
    // );
    // const contractItem = this.contractItemDoc.valueChanges();
    // return contractItem;
  }

  announceCollectionChange(collection: ContractItemsCollection): void {
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
  async deleteContractItem(itemDoc: ContractItemDoc): Promise<any> {
    try {
      await itemDoc.delete();
      return { ok: true, error: null };
    } catch (err) {
      return { ok: false, error: err };
    }
  }

  async saveNewItem(
    itemData: SubcontractItem,
    projectId: string,
    subcontractId: string
  ): Promise<DocumentReference<SubcontractItem>> {
    // TODO: [FCSUB-465] Fix saveNewItem
    const collectionPath = this.getCollectionPath(projectId, subcontractId);
    const response = await this.afs
      .collection<SubcontractItem>(collectionPath)
      .add(itemData);
    return response;
  }

  saveItemFromForm(
    contractItemForm: FormGroup,
    contractItemDoc: ContractItemDoc,
    status: number
  ): any {
    const update: any = {};

    const formValue = contractItemForm.value;
    const controls = contractItemForm.controls;
    const controlKeys = Object.keys(controls);

    controlKeys.forEach((key) => {
      const control: AbstractControl = controls[key];

      switch (true) {
        case control.pristine:
          // don't do anything. no change in the value;
          break;
        case !formValue[key]:
          // don't do anything, the value is not defined
          break;
        case formValue[key].hasOwnProperty('valuesOnly'):
          update[key] = formValue[key].valuesOnly;
          break;
        case formValue[key].hasOwnProperty('_isAMomentObject'):
          update[key] = formValue[key].toDate();
          break;
        default:
          update[key] = formValue[key];
      }
    });

    update.isNew = false; // at least one value must change in order to fire the trigger;
    update.status = status;

    return contractItemDoc.update(update);
  }

  createItemForApprovedContract(
    subcontract: Subcontract,
    title: string,
    itemNumber: number
  ): SubcontractItem {
    const contractItem: SubcontractItem = {};
    if (subcontract.amounts) {
      contractItem.contractAmount = subcontract.amounts.contractOriginal;
      contractItem.amountRemaining = contractItem.contractAmount;
    }

    // contractItem.itemDate = DateTime.now();
    contractItem.title = title;
    contractItem.itemNumber = itemNumber;
    contractItem.approvedPercent = 0;
    contractItem.claimedPercent = 0;
    contractItem.approvedToDate = CurrencyClass.createCurrency();
    contractItem.claimedToDate = CurrencyClass.createCurrency();
    contractItem.status = PaymentStatus.Approved;
    contractItem.projectId = subcontract.project
      ? subcontract.project.id
      : undefined;
    contractItem.subcontractId = subcontract.id;
    return contractItem;
  }
}
