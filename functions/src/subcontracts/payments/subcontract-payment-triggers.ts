/* eslint-disable @typescript-eslint/no-unused-vars */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { SubcontractPayment,
          // MostRecentPayment,
          // ContractItem,
          // PaymentStatus,
          // ContractItemInterface,
          // PaymentItem,
        } from '@workspace/shared/data-access-models';

// [LS-12] we set the payment number in the payment create method
// so right now we don't have to do anything on create new payment

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

export const subcontractPaymentCreate = functions.firestore.document('subcontracts/{subcontractId}/payments/{paymentId}')
.onCreate((snap, context) => {
    return onCreateSubcontractPayment(snap, context);
});

export const subcontractPaymentTest = functions.firestore.document('useers/{id}')
.onCreate((snap, context) => {
  console.log('trigger for new user');
});

/**
 *
 * @param snap: DocumentSnapshot
 * @param context: EventContext
 * When we get a request to create a new payment we are going to do two things:
 * 1. Update the payment.id property equal to the document.id
 * 2. Set this payment as 'MostRecentPayment` for the subcontract
 * These two operations will be run as a batch to ensure they both succeed
 * or they both fail.
 */
function onCreateSubcontractPayment(snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext): Promise<any[]>{
  console.log('OnCreate trigger for subcontract payment');
  const paymentId = context.params.paymentId;
  const paymentRef = snap.ref;
  const payment: SubcontractPayment = snap.data() as SubcontractPayment;
  payment.id = paymentId;
  // const mostRecentPayment = MostRecentPayment.createFromPayment(payment.valuesOnly);
  const subcontractId: string = context.params.subcontractId;
  console.log('Subcontract Id', subcontractId);
  // const updateData = {mostRecentPayment};
  // console.log('ON CREATE TRIGGER FOR SUBCONTRACT PAYMENT, subcontract updateData', updateData);
  // const subcontractRef = db.doc(`subcontracts/${subcontractId}`);

  const promises: any[] = [];

  // const batch = db.batch();
  // batch.update(subcontractRef, updateData);
  const promise = updatePayment(paymentRef, {id: paymentId});
  promises.push(promise);
  // .then(res => res )
  // .catch(err => err);
  // batch.update(paymentRef, {id: paymentId});
  // const promise = commitBatch(batch);
  // promises.push(promise);


    // ============================
    //
    // Now create the Payment Items
    // just for the moment we won't create items here
    //
    // ============================

    // TODO: [FCSUB-383] Rewrite for Update Subcontract Payment for path
  // const contractItemCollectionName = ContractItem.collectionPath(subcontractId);
  // const paymentItemCollectionName = PaymentItem.collectionPath(subcontractId, paymentId);
  // console.log('Contract Item collection name', contractItemCollectionName);
  // console.log('Payment Item collection Name', paymentItemCollectionName);
  // const collectionRef = db.collection(contractItemCollectionName)
  //     .where('status', '==', PaymentStatus.Approved)
  //     .orderBy('itemNumber');

  // collectionRef.get()
  //     .then(contractItemsSnap => {
  //       console.log('Number of contractItems found', contractItemsSnap.size);
  //       contractItemsSnap.forEach(contractItemSnap => {

  //         promises.push(createItem(contractItemSnap, subcontractId, paymentId, payment));
  //       });
  //     })
  //     .catch(err => 'An error occurred');

  return Promise.all(promises);

  }

type f = FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>;
// type s = FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>

// const createItem = async (itemSnap: s, subcontractId: string, paymentId: string, payment: any) => {
//   const data = itemSnap.data() as unknown;
//   const itemData = data as ContractItemInterface;
//   const contractItem = new ContractItem(itemData);
//   console.log('Creating payment item for paymentId', paymentId);
//   const paymentItem = PaymentItem.createNewFromContractItem(contractItem, payment);
//   console.log('PAYMENT ITEM READ TO CREATE ', paymentItem)
//   const paymentItemCollectionName = PaymentItem.collectionPath(subcontractId, paymentId);
//   try {
//     const response = await db.collection(paymentItemCollectionName).add(paymentItem.valuesOnly);
//     console.log('PAYMENT ITEM CREATED id', response.id);
//     return response;
//   }
//   catch (err) {
//     console.log('An error occurred attempting to create payment item', err)
//     return err;
//   }
// }



const updatePayment = async (paymentRef: f, updateData: any ) => {
  console.log('SUBCONTRACT PAYMENT TRIGGER ON CREATE, updating payment id, updateData', updateData)
  try {
    const result = await paymentRef.update(updateData);
    console.log('SUBCONTRACT PAYMENT TRIGGER ON CREATE, payment id updated, write result', result);
    return result;
  }
  catch (err) {
    return err;
  }
};

// const commitBatch = async (batch: FirebaseFirestore.WriteBatch) => {
//   try{
//     const res = await batch.commit();
//     return res;
//   }
//   catch (err) {
//     return err;
//   }
// };

  /**
   * Following is only a stub of a trigeer
   */
export const onWriteSubcontractPayment = functions.firestore.document('subcontractPayments/{id}')
    .onWrite(async (change, context) => {


      // tslint:disable-next-line: no-use-before-declare
      try {
        const res = await handleWrite(context);
        return res;
      } catch (err) {
        console.log(err);
        return (err);
      }
    });

// tslint:disable-next-line: only-arrow-functions
const handleWrite = async function(evtContext: functions.EventContext): Promise<any>{
      const projectId = evtContext.params.projectId;
      // console.log('handle write, projectId', projectId);
      return projectId;

    };


    // const paymentPath = snap.ref.path;

    // const tenantId = context.params.tenantId;
    // const projectId = context.params.projectId;
    // console.log('tenantId', tenantId);
    // console.log('projectId', projectId)


    // console.log('paymentRef', paymentRef)

    // const subcontractPath = `tenants/${tenantId}/projects/${projectId}/subcontracts/${subcontractId}`;
    // const subcontractRef: FirebaseFirestore.DocumentReference = db.doc(subcontractPath);
    // return subcontractRef.get()
    //     .then((res) => {

    //         // have to convert to type 'unknown' before trying to convert to SubcontractInterface
    //         const unknown = res as unknown;
    //         const subcontract = unknown as SubcontractInterface;
    //         // const paymentData: SubcontractPaymentInterface = new SubcontractPayment(paymentId, subcontract);
    //         // console.log('Payment data', paymentData)

    //         return paymentRef.set(paymentData)
    //     })
    //     .catch(Error)



// function updateId(snapshot: FirebaseFirestore.DocumentSnapshot) {
//     // whenever we create a new document, we want to ensure the id field contains the same value
//     // as the document id
//     const docRef = snapshot.ref;
//     return docRef.set({'id': snapshot.id})
// }
