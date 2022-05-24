/* eslint-disable @typescript-eslint/no-empty-function */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';


import { MostRecentPayment } from '@workspace/shared/data-access-models';

let app: any = null;


function initialize(): void{

if (!app){
  app = admin.initializeApp();
}
}

export const deleteTopLevelSubcontracts = functions.https.onCall((data, context) => {
  // initialize();
  const promises: any[] = [];
  return admin.firestore().collection('subcontracts')
  .get()
  .then(subcontracts => {
    subcontracts.forEach(subcontractSnapshot => {
      promises.push(subcontractSnapshot.ref.delete());   });
  });
  return Promise.all(promises);

});
export const updateSubcontractmostRecentPayment = functions.https.onCall((data, context) => {

    initialize();
    // let i = 0;
    const promises: any[] = [];
    return admin.firestore().collection('subcontracts')

    .get()
    .then(subcontracts => {
        subcontracts.forEach(subcontractSnapshot => {
            const id = subcontractSnapshot.id;
            return admin.firestore().collection('subcontractPayments')
            .where ('subcontract.id', '==', id)
            .orderBy('number', 'desc')
            .get()
            .then(paymentsSnap => {
                if (paymentsSnap.size > 0) {

                    const mostRecentPaymentSnap = paymentsSnap.docs[0];
                    const mostRecentPayment = mostRecentPaymentSnap.data();
                    const previousPayment: MostRecentPayment =
                    {
                        id: mostRecentPayment.id,
                        //
                        // number: mostRecentPayment.paymentNumber,
                        paymentNumber: 0,
                        status: mostRecentPayment.status,
                        claimed: mostRecentPayment.amounts.thisClaimed,
                        approved: mostRecentPayment.amounts.thisApproved,
                    };
                    const updateData = { previousPayment };
                    const promise = subcontractSnapshot.ref.set(updateData, {merge: true});
                    return promise;
                }  else {
                    return Promise.resolve(null);
                }
            });
        });
        Promise.all(promises)
        .then(result => {
        })
        .catch(err => {
            console.log('An error occurred', err);
        });
    });

});


