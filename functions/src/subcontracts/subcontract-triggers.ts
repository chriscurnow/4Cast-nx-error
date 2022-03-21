import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
// import { SubcontractService, ContractItem } from '@4cast/subcontract';


if (!admin.apps.length) {
  admin.initializeApp();
}



// [LS-12] we set the payment number in the payment create method
// so right now we don't have to do anything on create new payment

export const subcontractCreate = functions.firestore.document('subcontracts/{id}')
.onCreate((snap, context) => {

    console.log('Subcontract Trigger subcontractCreate, snapshot', snap);
    const id = snap.id;
    const data = {id};
    console.log('Subcontract Trigger subcontract create data', data);
    return snap.ref.set(data, {merge: true});

});

export const subcontractUpdate = functions.firestore.document('subcontracts/{subcontractId}')
.onUpdate((change, context) => {

  // const subcontractId =  context.params.subcontractId;
  // console.log('Subcontract new value raw', change.after.data())
  // console.log('Subcontract old value raw', change.before.data());
  const newValue = change.after.data();
  const oldValue = change.before.data();
  // const newValue = new Subcontract (change.after.data());
  // const oldValue = new Subcontract (change.before.data());
  console.log('Subcontract update started');
  console.log('old value isDraft', oldValue.isDraft);

  // Wwe are watching for when the subcontract is sent to us
  // with the 'isDraft' value changing from TRUE to FALSE
  // At this point it becomes an approved subcontract and we need
  // to create the ContractItem representing the contract amounts.

  if (oldValue.isDraft && !newValue.isDraft) {
    console.log('SUBCONTRACT ON UPDATE TRIGER, isDraft has changed');

    // TODO:
    // const contractUpdate = SubcontractService.createItemForApprovedContract(newValue);

    // const collectionPath = ContractItem.collectionPath(subcontractId);
    // const promise =  createContractItem(collectionPath, contractUpdate);
    // return promise;

    return Promise.resolve(null);

  } else {
    return Promise.resolve(null);
  }


});

// const createContractItem = async (collectionPath: string, itemData: any) => {
//   try {
//     const res = await admin.firestore().collection(`${collectionPath}`).add(itemData);
//     console.log('Contract item created');
//     return res;
//   }
//   catch (err){
//     return err;
//   }
// }

// export const subcontractUpdate = functions.firestore.document('subcontracts/{subcontractId}')
// .onUpdate((change, context) => {

//   const subcontractId: string = context.params.subcontractId;

//   const subcontract = new Subcontract(change.after.data());
//   const ref = change.after.ref;
//   const promises: Promise<void>[] = [];
//   const paymentsPromise = admin.firestore().collection(`subcontractPayments`)
//     .where('subcontract.id', '==', subcontractId)
//     .get()
//     .then(paymentsSnapshot => {
//       let claimedToDate: Currency = createCurrency()
//       let approvedToDate: Currency = createCurrency()

//       paymentsSnapshot.forEach(paymentData => {

//         const payment = new SubcontractPayment (paymentData.data())
//         const amountClaimed = payment.amounts.thisClaimed.amount;
//         const amountApproved = payment.amounts.thisClaimed.amount;
//         claimedToDate = claimedToDate.add(amountClaimed);
//         approvedToDate = approvedToDate.add(amountApproved);
//       })
//       console.log('Subcontract Trigger Update, claimed to date', claimedToDate.valuesOnly)
//       subcontract.amounts.toDateClaimed = claimedToDate
//       subcontract.amounts.toDateApproved = approvedToDate;
//       subcontract.amounts.percentApproved = Math.round((approvedToDate.amount / subcontract.amounts.contractOriginal.amount)*100);
//       subcontract.amounts.percentClaimed = Math.round((claimedToDate.amount / subcontract.amounts.contractOriginal.amount)*100);
//     })

//     promises.push(paymentsPromise);

//     // const variationsPromise = admin.firestore().collection('subcontractVariations')
//     //   .where('subcontract.id', '==', subcontractId)
//     //   .get()
//     //   .then(variationsSnapshot => {
//     //     let toDateVariations = createCurrency();
//     //     variationsSnapshot.forEach(variationDoc => {
//     //       const variation: SubcontractVariation = new SubcontractVariation(variationDoc.data());
//     //       toDateVariations = toDateVariations.add(variation.variationAmount)
//     //     })
//     //     console.log('Subcontract Update, toDateVariations', toDateVariations)
//     //     subcontract.amounts.toDateVariations = toDateVariations;
//     //     subcontract.amounts.contractRevised = subcontract.amounts.contractOriginal.add(toDateVariations);
//     //   })

//     //   promises.push(variationsPromise)

//       return Promise.all(promises)
//       .then(res => {
//         const update = subcontract.amounts.valuesOnly
//         console.log('Subcontract trigger onUpdate, update', update)
//         return ref.set(update, {merge: true})
//         .then(updateResponse => {
//           console.log('Subcontract trigger onUpdate – completed successfully')
//           return updateResponse;
//         })
//         .catch(err => {
//           console.log('Subcontract trigger onUpdate - an error occurred', err);
//           return err;
//         })
//       })
// })
