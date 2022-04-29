import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
 response.send('Hello from Firebase!');
});

exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
      .onCreate((snap, context) => {
        const original = snap.data().original;
        console.log('Uppercasing', context.params.documentId, original);
        const uppercase = original.toUpperCase();
        return snap.ref.set({uppercase}, {merge: true});
      });


export * from './subcontracts';
// export * from './subcontractVariations/subcontract-variations-triggers';
// export * from './contract-items/contract-items-triggers';