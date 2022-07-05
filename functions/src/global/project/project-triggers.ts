import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { setId}  from '../../utils/utils';
import { Project } from '@workspace/shared/data-access-models'

// import { SubcontractService, ContractItem } from '@4cast/subcontract';


if (!admin.apps.length) {
  admin.initializeApp();
}

export const projectCreate = functions.firestore.document('projects/{id}')
.onCreate((snap, context) => {
    return setId(snap);
});


