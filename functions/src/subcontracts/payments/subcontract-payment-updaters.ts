/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-prototype-builtins */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { PaymentStatus,
        //  Currency,

         PaymentAmounts,
        } from '@workspace/shared/data-access-models';

let app: any = null;

const initialize = function(): void{

if (!app){
  app = admin.initializeApp();
}


};

export const updatePaymentStatus = functions.https.onCall((data, context) => {
    initialize();
    // let i = 0;
    const promises: any[] = [];
    return admin.firestore().collection('subcontractPayments')
    .where('status.id', '==', 0)
    .get()
    .then(payments => {

      payments.forEach(paymentSnapshot => {
        // const id = paymentSnapshot.id;
        const paymentRef = paymentSnapshot.ref;
        const status = PaymentStatus.Approved;
        // tslint:disable-next-line: no-void-expression
        const update = status;
        const promise = paymentRef.update({status: update});
        promises.push(promise);

      });
      return Promise.all(promises)
      .then(result => {
        return result;
      });
    })
    .catch(err => {
      console.log('An error occurred', err)
      return 'An error occurred.';
    });
  });

  // previously we had 'contractOriginal' in subcontract and 'contractAmount' in payment
  // now convert all payments to use 'contractOriginal`
export const updateContractOriginal = functions.https.onCall((data, context) => {
    const startAfter = data.startAfter;
    initialize();
    // let i = 0;
    const promises: any[] = [];
    return admin.firestore().collection('subcontractPayments')
    .orderBy('id')

    .startAfter(startAfter)
    .limit(1500)
    .get()
    .then(payments => {

      payments.forEach(paymentSnapshot => {
        // const id = paymentSnapshot.id;

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
        return result;
      });
    })
    .catch(err => {
      return 'An error occurred.';
    });
  });

/**
 * Update all payments to use createCurrency format
 * (No parameters required.)
 */
export const updatePaymentCurrency = functions.https.onCall((data, context) => {
    initialize();
    // let i = 0;
    const promises: any[] = [];
    return admin.firestore().collection('subcontractPayments')
    .get()
    .then(payments => {

      payments.forEach(paymentSnapshot => {
        // const id = paymentSnapshot.id;
        const paymentRef = paymentSnapshot.ref;
        const paymentData = paymentSnapshot.data();
        const tempAmounts = paymentData.amounts;

        if (tempAmounts?.contractAmount.hasOwnProperty('amount')) {
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
  //   //     newValue = createCurrency(value);
  //   //     break;
  //   //   case 'number' :
  //   //     const integerValue = Math.round(value * 100);
  //   //     newValue = createCurrency(integerValue);
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



function setupNewAmounts(oldAmounts: any): PaymentAmounts {
    // return {
    //   contractAmount: convertOldFormat(oldAmounts.contractAmount),
    //   toDateVariations: convertOldFormat(oldAmounts.toDateVariations),
    //   contractRevised: convertOldFormat(oldAmounts.contractRevised),
    //   previouslyApproved: convertAmountItem(oldAmounts, 'previouslyApproved'),
    //   previouslyClaimed: convertAmountItem(oldAmounts, 'previouslyClaimed'),
    //   thisClaimed: convertAmountItem(oldAmounts, 'thisClaimed'),
    //   thisApproved: convertAmountItem(oldAmounts, 'thisApproved'),

    // }
    return {} as PaymentAmounts;
  }
