import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Subcontract,
         PaymentAmountItem,
         setPaymentDate,
         PaymentAmounts,
         PaymentStatus,
         SubcontractPayment,
         createAmountItem
        } from '@workspace/shared/data-access-models';
import { Currency } from '@workspace/shared/util';
// tslint:disable-next-line: no-duplicate-imports


// import * as seqNo from '../utils/sequenceNumbers'



let app: any = null;


const initialize = function(): void{

if (!app){
  app = admin.initializeApp();
}

  // console.log('Initialised app', app);

};


export const testCreateStatus = functions.https.onCall((data, context) => {
  const status = PaymentStatus.Draft;
  return status;
});

export const createSubcontractPayment = functions.https.onCall((data, context) => {
  console.log('Data for new subcontract payment: ', data);
  initialize();
  const subcontractId = data.subcontractId;
  const path =  'subcontractPayments';
  const color = 'color: limegreen';
  console.log('Subcontract payment path: ', path);
  // get a reference to the payments collection for this subcontract

  const contractPayments: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> = admin.firestore().collection(path);


  // TODO: [FCNG-237] Refactor to get subcontract before creating database document
  // 'subcontractPayment'

  // 1. Check if there is an existing unapproved payment, if so return it.

  return contractPayments
  .where('subcontract.id', '==', subcontractId)
  .where('status.id', '<', 2)
  .get()
  .then(unapprovedPayments => {



      const docs = unapprovedPayments.docs;
      console.log('%cCreate subcontract payment, unapprovedPayment.docs (with color)', 'color: #bada55', docs.length);
      // just for testing force it to create a new payment
      if (docs.length > 10 ) {
        console.log('%cFound at least one unapproved payment', color);
          // we must have found at least one unapproved payment
          // we should have found no more than one, but there could always be some error somewhere
          // we should also never have more than one unapproved payment
        const paymentSnapshot = docs[0];
        return paymentSnapshot.data();
      } else {

        console.log('%cDidnt find any unapproved payments, create one', color);

        return createNewPayment(contractPayments, subcontractId);

      }
  })
  .catch(err => {
      console.log('Error ', err);
      return 'an error occurred ' + err;
  });
});


function createNewPayment(
    contractPayments: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    subcontractId: string): Promise<FirebaseFirestore.DocumentData | undefined> {
    console.log('Starting method createNewPayment');
    const subcontractPath = `subcontracts/${subcontractId}`;
    return admin.firestore().doc(subcontractPath).get()
  .then((subcontractDoc) => createPaymentForSubcontract (contractPayments, subcontractDoc));
}


function createPaymentForSubcontract(
    contractPayments: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
    subcontractDoc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>): Promise<FirebaseFirestore.DocumentData | undefined> {
  // console.log('Starting method createPaymentForSubcontract');
  const methodName = 'createPaymentForSubcontract';
  log(methodName, 'Subcontract.mostRecentPayment as returned ', subcontractDoc.data()?.mostRecentPayment);
  const subcontract = new Subcontract(subcontractDoc.data()); // convert result to type Subcontract
  const newPayment = createNewPaymentForSubcontract(subcontract);

  return addPaymentToCollection(contractPayments, newPayment);
}


/**
 *
 * @param contractPayments: collection
 * @param plainData: any
 */

function addPaymentToCollection(contractPayments: FirebaseFirestore.CollectionReference,
                                plainData: any): Promise<FirebaseFirestore.DocumentData | undefined> {

  return contractPayments.add(plainData)
  .then(payment => payment.get()
      .then((paymentSnapshot: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
        const id = paymentSnapshot.id;
        const paymentData: FirebaseFirestore.DocumentData | undefined = paymentSnapshot.data();
        if (paymentData) {
           paymentData.id = id;
        }

        console.log('Result of add document:', paymentData);
        return paymentData;
      }));
}

/**
 *
 * @param subcontract: Subcontract
 * @returns payment: any
 */

export function createNewPaymentForSubcontract(subcontract: Subcontract): any{
  // const methodName = 'createNewPaymentForSubcontract'
  // log(methodName, 'Starting method createNewPaymentForSubcontract', null)
  // log(methodName, 'creating with subcontract.mostRecentPayment', subcontract.mostRecentPayment)
  // Initialise a new payment instance
  const payment: SubcontractPayment = {};


  // console.log('Initialised new payment for subcontract:', subcontract);

  // let amounts: PaymentAmounts = new PaymentAmounts(null);
  const amounts: PaymentAmounts = payment.amounts ? payment.amounts : {};

  // console.log('Creating amounts subcontract amounts', subcontract.amounts);
  if (subcontract && subcontract.amounts) {

    // amounts = new PaymentAmounts (subcontract.amounts);
    // amounts.contractOriginal = new Currency(subcontract.amounts.contractOriginal);
    // amounts.contractRevised = new Currency(subcontract.amounts.contractRevised);
    // amounts.toDateVariations = new Currency(subcontract.amounts.toDateVariations);
    if (subcontract.mostRecentPayment) {
      const payment = subcontract.mostRecentPayment;
      amounts.previouslyClaimed = {
        toDate: payment.claimed ? payment.claimed.toDate : undefined
     };
     amounts.previouslyApproved = createAmountItem(
       subcontract.mostRecentPayment.approved
     );
    } else {
      log ('createNewPaymentForSubcontract', 'No previous payment found using subcontract amounts:', subcontract.amounts);

      amounts.previouslyClaimed = {
        toDate: subcontract.amounts.toDateClaimed,
        percent: 0,
        amount: new Currency(),
      };



      amounts.previouslyApproved = {
        toDate: subcontract.amounts.toDateApproved,
        percent: 0,
        amount: new Currency(),
      };


      amounts.thisClaimed = amounts.previouslyClaimed; // default new amount claimed = previous amount claimed.
      amounts.thisApproved = amounts.previouslyApproved;
  }
  // console.log('Amounts set successfully', amounts);
    payment.amounts = amounts;
    setPaymentDate(payment, new Date());

  // if (subcontract.project ){
  //     payment.paymentHeader. =  subcontract.project
  // }
  // console.log('Payment project set')
    payment.status = PaymentStatus.Draft;


  // console.log('Payment status set', payment.status)
    payment.subcontractId = subcontract.id;
  // console.log('Payment subcontract set', payment);
    const plainPayment = payment.toPlainObject();
    // const msg = 'SUBCONTRACT PAYMENT FUNCTIONS - CreateNewPaymentForSubcontract - plain object amounts previously claimed';
    // console.log(msg, plainPayment.amounts.previouslyClaimed);
    return plainPayment;




  // TODO: [LS-2] Add percent to subcontracts amounts class definition
  // Note payment number should be assigned in trigger on save new payment
}
}

const log = function(method: string, info: string, data: any): void{
  console.log('');
  console.log('============================================================');
  console.log(`SUBCONTRACT PAYMENT FUNCTIONS ${method}`);
  console.log(`${info}`, data);
  console.log('============================================================');
};
// export const approvePayment = functions.https.onCall((data: ApprovedPaymentUpdate, context )=> {
//   const id = data.id;

//   const batch = admin.firestore().batch()

//   const subcontractId: string = data.subcontractId;
//   const paymentRef = admin.firestore().doc(`subcontractPayments/${id}`)

//   return paymentRef.update(updateData)
//   .then(res => {
//     console.log('update successful');
//     const mostRecentPayment: ImostRecentPayment = new mostRecentPayment
//     const subcontractUpdate: SubcontractInterface = {
//       mostRecentPayment,
//       amounts: {
//         toDateApproved: new Currency(thisApproved.toDate)
//       },

//       isNew: false,
//       isDraft: false,
//       id: '',
//       name: '',
//       number: 0,


//     }
//     return updateSubcontractForApproved(subcontractId, subcontractUpdate);
//   })
//   .catch(err => {
//     console.log('An error occurred attempting to update payment', err)
//   })

//   function updateSubcontractForApproved(id: string, contractUpdate: any) {
//     const subcontractRef = admin.firestore().doc(`subcontracts/${id}`);
//     return subcontractRef.update(contractUpdate)

//   }
// })
