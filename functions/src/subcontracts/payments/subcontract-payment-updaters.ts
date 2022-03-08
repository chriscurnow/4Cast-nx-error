import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { PaymentStatus,
        //  Currency,
         PaymentAmountsInterface,
         PaymentAmounts,
        } from '@4cast/classes';

let app: any = null;

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
const initialize = function(): void{

if (!app){
  app = admin.initializeApp();
}

  // console.log('Initialised app', app);

};

export const updatePaymentStatus = functions.https.onCall((data, context) => {
    console.log('Update Payment Status, expect data to be null:', data);
    initialize();
    let i = 0;
    const promises: any[] = [];
    return admin.firestore().collection('subcontractPayments')
    .where('status.id', '==', 0)
    .get()
    .then(payments => {
      console.log('got payments', payments.size);

      payments.forEach(paymentSnapshot => {
        const id = paymentSnapshot.id;
        console.log('Updating payment ', id, i++);
        const paymentRef = paymentSnapshot.ref;
        const status = PaymentStatus.Approved;
        // tslint:disable-next-line: no-void-expression
        const update = status;
        const promise = paymentRef.update({status: update});
        promises.push(promise);

      });
      return Promise.all(promises)
      .then(result => {
        console.log('result of promise.all', result);
        return result;
      });
    })
    .catch(err => {
      console.log('an error occurred', err);
      return 'An error occurred.';
    });
  });

  // previously we had 'contractOriginal' in subcontract and 'contractAmount' in payment
  // now convert all payments to use 'contractOriginal`
export const updateContractOriginal = functions.https.onCall((data, context) => {
    console.log('Update Contract Original, :', data);
    const startAfter = data.startAfter;
    initialize();
    let i = 0;
    const promises: any[] = [];
    return admin.firestore().collection('subcontractPayments')
    .orderBy('id')

    .startAfter(startAfter)
    .limit(1500)
    .get()
    .then(payments => {
      console.log('got payments', payments.size);

      payments.forEach(paymentSnapshot => {
        const id = paymentSnapshot.id;
        console.log('Updating payment ', id, i++);

        let amounts = paymentSnapshot.get('amounts');
        if (amounts.hasOwnProperty('contractAmount')) {
          const newAmounts = {
            contractOriginal: amounts.contractAmount,
            contractRevised: amounts.contractRevised,
            toDateVairations: amounts.toDateVariations,
            previouslyClaimed: amounts.previouslyClaimed,
            previouslyApproved: amounts.previouslyApproved,
            thisApproved: amounts.thisApproved,
            thisClaimed: amounts.thisClaimed,
          };
          amounts = newAmounts;

        }
        const paymentRef = paymentSnapshot.ref;
        const promise = paymentRef.update({amounts});
        promises.push(promise);

      });
      return Promise.all(promises)
      .then(result => {
        console.log('result of promise.all', result);
        return result;
      });
    })
    .catch(err => {
      console.log('an error occurred', err);
      return 'An error occurred.';
    });
  });

/**
 * Update all payments to use new currency format
 * (No parameters required.)
 */
export const updatePaymentCurrency = functions.https.onCall((data, context) => {
    console.log('Update Payment Currency, expect data to be null:', data);
    initialize();
    let i = 0;
    const promises: any[] = [];
    return admin.firestore().collection('subcontractPayments')
    .get()
    .then(payments => {
      console.log('got payments', payments.size);

      payments.forEach(paymentSnapshot => {
        const id = paymentSnapshot.id;
        console.log('Updating payment ', id, i++);
        const paymentRef = paymentSnapshot.ref;
        const paymentData = paymentSnapshot.data();
        const tempAmounts = paymentData.amounts;

        if (tempAmounts?.contractAmount.hasOwnProperty('amount')) {
          console.log('Skipping payment – already updated');
        } else {

        try{
          const oldAmounts = setupOldAmounts(tempAmounts);
          const amounts = setupNewAmounts(oldAmounts);

          const update = {
          amounts,
          oldAmounts,
        };
          const promise = paymentRef.update(update);
          promises.push(promise);
        }
        catch (err) {
          console.log('An error occured', err);
        }

      }
    });
      return Promise.all(promises)
      .then(result => result);
    })
    .catch(err => 'An error occurred.');
  });



  // function convertOldFormat(value: any) {
  //   // let newValue: Currency
  //   // switch (typeof(value)) {
  //   //   case 'string' :
  //   //     newValue = new Currency(value);
  //   //     break;
  //   //   case 'number' :
  //   //     const integerValue = Math.round(value * 100);
  //   //     newValue = new Currency(integerValue);
  //   //     break;
  //   //   default :
  //   //     newValue = value
  //   // }
  //   return {
  //     amount: 0,
  //     currency: '',
  //     precision: 2
  //   }
  //   }

  // function convertPercent(value: any) {
  //   switch (typeof(value)) {
  //     case 'string':
  //       return parseInt(value);
  //     case 'number' :
  //       return value;
  //     default:
  //       return 0;
  //   }
  // }

  // function convertAmountItem (value: any, item: string) {
  //   return {
  //     toDate: convertOldFormat(value[item].toDate),
  //     percent: convertPercent(value[item]?.percent),
  //     amount: convertOldFormat(value[item]?.amount)
  //   }
  // }

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function setupOldAmounts(tempAmounts: any): any{
    return {
      contractAmount: tempAmounts?.contractAmount,
      toDateVariations: tempAmounts?.toDateVariations,
      contractRevised: tempAmounts?.contractRevised,
      previouslyApproved: tempAmounts?.previouslyApproved,
      previouslyClaimed: tempAmounts?.previouslyClaimed,
      thisApproved: tempAmounts?.thisApproved,
      thisClaimed: tempAmounts?.thisClaimed,
    };
  }

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function setupNewAmounts(oldAmounts: any): PaymentAmountsInterface {
    // return {
    //   contractAmount: convertOldFormat(oldAmounts.contractAmount),
    //   toDateVariations: convertOldFormat(oldAmounts.toDateVariations),
    //   contractRevised: convertOldFormat(oldAmounts.contractRevised),
    //   previouslyApproved: convertAmountItem(oldAmounts, 'previouslyApproved'),
    //   previouslyClaimed: convertAmountItem(oldAmounts, 'previouslyClaimed'),
    //   thisClaimed: convertAmountItem(oldAmounts, 'thisClaimed'),
    //   thisApproved: convertAmountItem(oldAmounts, 'thisApproved'),

    // }
    return new PaymentAmounts();
  }
