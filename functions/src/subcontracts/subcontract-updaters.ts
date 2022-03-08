import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';


import { MostRecentPaymentInterface as MostRecentPaymentInterface } from '@4cast/classes';

let app: any = null;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
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
      console.log('Deleting subcontract id: ', subcontractSnapshot.id);
      promises.push(subcontractSnapshot.ref.delete());   });
  });
  return Promise.all(promises);

});
export const updateSubcontractmostRecentPayment = functions.https.onCall((data, context) => {

    console.log('Update Subcontract Previous Payment, expect data to be null:', data);
    initialize();
    let i = 0;
    const promises: any[] = [];
    return admin.firestore().collection('subcontracts')

    .get()
    .then(subcontracts => {
        console.log('Got subcontracts, count', subcontracts.size);
        subcontracts.forEach(subcontractSnapshot => {
            const id = subcontractSnapshot.id;
            console.log('Updating subcontract ', id, i++);
            return admin.firestore().collection('subcontractPayments')
            .where ('subcontract.id', '==', id)
            .orderBy('number', 'desc')
            .get()
            .then(paymentsSnap => {
                if (paymentsSnap.size > 0) {

                    const mostRecentPaymentSnap = paymentsSnap.docs[0];
                    const mostRecentPayment = mostRecentPaymentSnap.data();
                    const previousPayment: MostRecentPaymentInterface =
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
            console.log('All subcontracts updated', result);
        })
        .catch(err => {
            console.log('An error occurred', err);
        });
    });

});


