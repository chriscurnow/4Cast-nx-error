// import * as admin from 'firebase-admin';
// import * as functions from 'firebase-functions';
// import { PaymentItem } from '@4cast/subcontract[;'

export const triggerValue = 'trigger';
// const collectionName = PaymentItem.collectionName;

// export const subcontractPaymentCreate = functions.firestore.document(`${collectionName}/{id}`)
// .onCreate((snap, context) => {
//     return onCreatePaymentItem(snap, context);
// })

// function onCreatePaymentItem(snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext){
//     const paymentItemId = snap.id;
//     const paymentItemRef = snap.ref;
//     const paymentItem: PaymentItem = new PaymentItem(snap.data());
//     const subcontractId: string = snap.get('subcontract.id');

//     const subcontractRef = admin.firestore().doc(`subcontracts/${subcontractId}`)
//     const batch = admin.firestore().batch();
//     batch.update(subcontractRef, updateData);
//     batch.update(paymentRef, {id: paymentId})
//     return batch.commit()
//       .then(result => {
//            return result;
//       })
//       .catch(err => {
//           return err;
//       })
//   }
