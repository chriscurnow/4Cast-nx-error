/* eslint-disable @typescript-eslint/no-unused-vars */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { setId}  from '../../utils/utils';
import { Company } from '@workspace/shared/data-access-models'

// import { SubcontractService, ContractItem } from '@4cast/subcontract';


if (!admin.apps.length) {
  admin.initializeApp();
}


export const companyCreate = functions.firestore.document('companies/{id}')
.onCreate((snap, context) => {
    return setId(snap);
});

export const companyUpdate = functions.firestore.document('companies/{id}')
.onUpdate((change, context) => {

  const before: Company = change.before.data();
  const after: Company = change.after.data();
  const ref: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData> =
    change.after.ref;

  if(before.companyName !== after.companyName) {
    after.lowerCaseName = after.companyName.toLowerCase()
  }

  return ref.set (after)

})

