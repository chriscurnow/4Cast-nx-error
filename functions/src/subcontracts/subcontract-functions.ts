import * as admin from 'firebase-admin';
// import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Subcontract } from '@workspace/shared/data-access-models';
// import { Currency } from '@4cast/subcontract';

if(!admin.apps.length) {
  admin.initializeApp();
}

/**
 * We are moving subcontracts from top level to be aq sub-collection of projects
 */
export const moveSubcontracts = functions.https.onCall((data, context) => {
    console.log('Move subcontracts, expect data to be null:', data);

    const promises: any[] = [];

    // deakin project id 84175C75A294406699D3FDDE842F273A

    admin.firestore().collection('subcontracts')
    .where('supplier.id', '==', '246A06AEBC2345478A6301D3A6490B0E')
    .get()
    .then(contracts => {
        console.log('Subcontracts, number found', contracts.size);
        contracts.forEach((contractSnapshot => {
            const subcontract = contractSnapshot.data();
            const projectId = subcontract.project.id;
            console.log('Moving subcontract, subcontractId, projectId', subcontract.id, projectId);
            promises.push(admin.firestore().doc(`projects/${projectId}/subcontracts/${subcontract.id}`).set(subcontract));
        }));

        return Promise.all(promises)
        .then(result => {
            console.log('Completed OK');
            return 'Completed OK';
        })
        .catch(err => {
            console.log('an error occurred', err);
            return 'An error occurred.';
        });
    });
});

export const oldMoveSubcontracts = functions.https.onCall((data, context) => {
    console.log('Move subcontracts, expect data to be null:', data);

    const promises: any[] = [];
    return getProjects()
    .then(projects => {
        console.log('got projects, number = ', projects.size);

        projects.forEach((projectSnapshot: any )=> {
            const projectId = projectSnapshot.id;
            logProjectProgress(projectId);
            return admin.firestore().collection('subcontracts')
            .where ('project.id', '==', projectId)
            .get()
            .then((subcontracts: FirebaseFirestore.QuerySnapshot) => {
                console.log('Subcontracts for project', subcontracts.size);
                subcontracts.forEach((subcontractSnapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
                    promises.push( doMove(subcontractSnapshot));

                });

                return Promise.all(promises)
                .then(result => result)
                  .catch(err => {
                    console.log('an error occurred', err);
                  return 'An error occurred.';
                });
            });
        });
    })
    .catch(err => {
        console.log('an error occurred', err);
      return 'An error occurred.';
    });
});


function logProjectProgress(projectId: string) {
    console.log('');
    console.log('Moving subcontracts for project', projectId);
    console.log('==========================================================');
}

// function moveContractsForProject(subcontracts: FirebaseFirestore.QuerySnapshot){
//     console.log('Subcontracts for project', subcontracts.size);

//                 subcontracts.forEach((subcontractSnapshot: any) => {
//                 doMove(subcontractSnapshot)
//                 .then(result => {
//                     i++;
//                     promises.push();
//                 })

//                 })
// }


function getProjects()  {
  return admin.firestore().collection('projects')
  .get();
}


function doMove(contractSnapshot: FirebaseFirestore.QueryDocumentSnapshot){

      const subcontractId = contractSnapshot.id;
      const subcontract: Subcontract = contractSnapshot.data() as Subcontract;
      const projectId = subcontract?.project?.id;
      console.log('Moving subcontract, projectId, subcontractId', projectId, subcontractId);
      return admin.firestore().doc(`projects/${projectId}/subcontracts/${subcontractId}`).set(subcontract);

}
/**
 * Update all subcontracts to use new currency format
 * (No parameters required.)
 */
export const updateSubcontractCurrency = functions.https.onCall((data, context) => {
    console.log('Update Subcontract Currency, expect data to be null:', data);

    let i = 0;
    const promises: any[] = [];
    return admin.firestore().collection('subcontracts')

    .get()
    .then(subcontracts => {
      console.log('got subcontracts', subcontracts.size);

      subcontracts.forEach(subcontractSnapshot => {
        const id = subcontractSnapshot.id;
        console.log('Updating subcontract ', id, i++);
        const subcontractRef = subcontractSnapshot.ref;
        const subcontractData = subcontractSnapshot.data();
        const tempAmounts = subcontractData['amounts'];

        if (
          tempAmounts &&
          Object.prototype.hasOwnProperty.call(tempAmounts, 'contractOriginal')

        ) {
          if ( Object.prototype.hasOwnProperty.call(tempAmounts.contractOriginal, 'amount')) {
            console.log('Skipping subcontract – already updated');
          } else {
            const oldAmounts = setupOldAmounts(tempAmounts);
            const amounts = setupNewAmounts(oldAmounts);

            const update = {
              amounts,
              oldAmounts,
            };
            const promise = subcontractRef.update(update);
            promises.push(promise);
          }
        }
    });
     return Promise.all(promises)
      .then(result => result);
    })
    .catch(err => {
        console.log('an error occurred', err);
      return 'An error occurred.';
    });
  });



  // I am pretty sure we don't use this anymore

// export const createSubcontractForSupplier = functions.https.onCall((data, context) => {
//   const id = data.supplierId;
//   console.log('Started createSubcontractForSupplier, supplier id', id)
//   initialize();
//   return admin.firestore().doc(`suppliers/${id}`)
//   .get()
//   .then(supplier => {
//     const subcontract = new Subcontract(supplier);
//     console.log('Retreived supplier', supplier.data())
//     return admin.firestore().collection('subcontracts').add(subcontract.toPlainObject())
//     .then((docRef: FirebaseFirestore.DocumentReference) => {
//       console.log ('created new subcontract', docRef.id)
//       return docRef.id;
//     })
//     .catch(err => { return "An error occurred attempting to save new subcontract"})
//   })
// })



  function convertOldFormat(value: any) {
    // let newValue: Currency
    // switch (typeof(value)) {
    //   case 'string' :
    //     newValue = new Currency(value);
    //     break;
    //   case 'number' :
    //     const integerValue = Math.round(value * 100);
    //     newValue = new Currency(integerValue);
    //     break;
    //   default :
    //     newValue = value
    // }
    return {
      amount: 0,
      currency: '',
      precision: 2
    };
    }




  function setupOldAmounts(tempAmounts: any){
    return {
      contractOriginal: tempAmounts?.contractOriginal,
      toDateVariations: tempAmounts?.toDateVariations,
      contractRevised: tempAmounts?.contractRevised,

    };
  }


  function setupNewAmounts(oldAmounts: any) {
    return {
      contractOriginal: convertOldFormat(oldAmounts.contractOriginal),
      toDateVariations: convertOldFormat(oldAmounts.toDateVariations),
      contractRevised: convertOldFormat(oldAmounts.contractRevised),


    };
  }
