
import { SubcontractItem } from '@workspace/shared/data-access-models';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
// import { SubcontractService, ContractItem } from '@4cast/subcontract';


if (!admin.apps.length) {
  admin.initializeApp();
}


// [LS-12] we set the payment number in the payment create method
// so right now we don't have to do anything on create new payment

export const subcontractItemCreate = functions.firestore.document('projects/{projectId}/subcontracts/{subcontractId}/subcontractItems/{itemId}')
.onCreate((snap, context) => {

  return onCreteSubcontractItem(snap, context);
});


function onCreteSubcontractItem(snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext){
  const projectId = context.params.projectId;
  const subcontractId = context.params.subcontractId;
  console.log('onCreateSubcontractItem, projectId, subcontractId', projectId, subcontractId)
  const item: SubcontractItem = { ...snap.data() };
  item.id = snap.id;
  item.itemDate = new Date();
  item.isNew = false;
  const ref = admin
    .firestore()
    .collection(
      `projects/${projectId}/subcontracts/${subcontractId}/subcontractItems`
    )
    .orderBy('itenNumber', 'desc');

  return ref.get().then((querySnapshot) => {
    console.log('Got collection', querySnapshot.docs)
    let nextNumber = 1;
    if (querySnapshot.docs.length > 0) {
      const lastItemDoc = querySnapshot.docs[0];
      console.log('snapshot docs length', querySnapshot.docs.length)
      const lastItem: SubcontractItem = lastItemDoc.data();
      nextNumber = lastItem.itemNumber + 1;
    }
    item.itemNumber = nextNumber;
    console.log('Item ready to set', item)
    const writeResult = snap.ref.set(item, { merge: true });
    console.log('Write new item, write result', writeResult)
    return writeResult;
  });
}

// export const subcontractUpdate = functions.firestore.document('subcontracts/{subcontractId}')
// .onUpdate((change, context) => {

//   // const subcontractId =  context.params.subcontractId;
//   const newValue = change.after.data();
//   const oldValue = change.before.data();
//   // const newValue = new Subcontract (change.after.data());
//   // const oldValue = new Subcontract (change.before.data());

//   // Wwe are watching for when the subcontract is sent to us
//   // with the 'isDraft' value changing from TRUE to FALSE
//   // At this point it becomes an approved subcontract and we need
//   // to create the ContractItem representing the contract amounts.

//   if (oldValue.isDraft && !newValue.isDraft) {

//     // TODO:
//     // const contractUpdate = SubcontractService.createItemForApprovedContract(newValue);

//     // const collectionPath = ContractItem.collectionPath(subcontractId);
//     // const promise =  createContractItem(collectionPath, contractUpdate);
//     // return promise;

//     return Promise.resolve(null);

//   } else {
//     return Promise.resolve(null);
//   }


// });

// const createContractItem = async (collectionPath: string, itemData: any) => {
//   try {
//     const res = await admin.firestore().collection(`${collectionPath}`).add(itemData);
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
//     //     subcontract.amounts.toDateVariations = toDateVariations;
//     //     subcontract.amounts.contractRevised = subcontract.amounts.contractOriginal.add(toDateVariations);
//     //   })

//     //   promises.push(variationsPromise)

//       return Promise.all(promises)
//       .then(res => {
//         const update = subcontract.amounts.valuesOnly
//         return ref.set(update, {merge: true})
//         .then(updateResponse => {
//           return updateResponse;
//         })
//         .catch(err => {
//           return err;
//         })
//       })
// })
