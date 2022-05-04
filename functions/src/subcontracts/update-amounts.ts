/**
 * WE ARE NOT USING 'VARIATIONS' ANY MORE
 * Instead we are using the SubcontractItems collection
 * I've left some code here just in case it needs something here to compile.
 */

import * as admin from 'firebase-admin';
// import { createCurrency } from '@workspace/shared/util';

// const moduleName = 'SUBCONTRACT UPDATERS'

// tslint:disable-next-line: only-arrow-functions
export const updateVariations = function(subcontractId: string): Promise<any> {
  return admin.firestore().doc(`subcontracts/${subcontractId}`)
  .get()
  .then(subcontractSnap => {


   return admin.firestore().collection('subcontractItems')
      .where('subcontract.id', '==', subcontractId)
      .where('itemNumber', '>', 0) //
      .get()
      .then(variationsSnapshot => {
        // const toDateVariations = createCurrency();

        return Promise.resolve(null);

      })
      .catch(err => {
        return err;
      });
  });
};
