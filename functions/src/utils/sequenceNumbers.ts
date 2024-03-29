import * as admin  from 'firebase-admin';
import * as functions from 'firebase-functions';



interface ISequenceNumber{
    number: number
}

/**
 *
 * @param snap - document snapshotj of document to which we want to add a sequence number
 * @param context
 * @param seqNumberName
 *
 * Use this when calling from another function
 */
export const getLocalProjectSequenceNumber = function(documentSnapshot: FirebaseFirestore.DocumentSnapshot, data: any, seqNumberName: string){
    const tenantId = data.params.tenantId;
    const projectId = data.params.projectId;
    const path = getOneSequenceNumberPath(tenantId, projectId, seqNumberName);

    const seqNoRef: FirebaseFirestore.DocumentReference = admin.firestore().doc(path);

    const returnValue =  getSequenceNumber(seqNoRef, seqNumberName)
    .then(res => {
        const docData: any = documentSnapshot.data();
        // const next = data.
        if (docData ) {
            docData['number'] = res.number;
        }

        return documentSnapshot.ref.set(docData)
        .then(() => {
          return null;
        })
    })

    return returnValue;
}

export interface IParent {
  parentIdName: string,
  id: string
}


/**
 *
 * @param collection - name of the collection for which to find the number
 * @param parent - object containing the parent id name in the collection and the id of the parent
 * (eg: for subcontractPayments, the parent id name is {subcontract.id} and the id [of the subcontract] might be '4CCDEF3F2A...')
 */
export const getSequenceNumberForParent = function(collection: string, parent: IParent, sortField: string): Promise<number>{
    const path = collection;
    try {
        admin.initializeApp()
    }
    catch (err ) {return err};
    let parentIdName = '';
    let parentId = '';
    if(parent) {
        parentIdName = parent.parentIdName;
        parentId = parent.id;
    }

    const collectionRef = admin.firestore().collection(path);

    return collectionRef
    .where(parentIdName, '==', parentId)
    .orderBy(sortField, 'desc')
    .get()
    .then(documentCollection => {
        if(documentCollection.size > 0 ) {

        const lastDoc = documentCollection.docs[0];
        const nextNumber: number = lastDoc.get(sortField) + 1 // we are relying on the sequence being called 'number'
         return nextNumber} else {
            return 1;
        }
    })
    //  const seqNoRef: FirebaseFirestore.DocumentReference = admin.firestore().doc(path);
}



export const testSeqNo = functions.https.onRequest((request,response) => {

    const parent: IParent = {
        parentIdName: 'subcontract.id',
        id: '2F546C97E3D34D3097B5AB374F9E35E0'
    }

    getSequenceNumberForParent('subcontractPayments', parent, 'number')
    .then( number => {
        response.send(`returned sequence number ${number}`)
    })
    .catch(err => {
        console.log('An error occured', err);
    })

})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProjectSequenceNumber = functions.https.onCall((data,context)=> {
    const tenantId = data.tenantId;
    const projectId = data.projectId;
    const seqNumberName = data.seqNoName;


    const path = getOneSequenceNumberPath(tenantId, projectId, seqNumberName);
    const seqNoRef: FirebaseFirestore.DocumentReference = admin.firestore().doc(path);
    return getSequenceNumber(seqNoRef, seqNumberName)

})

function getSequenceNumber(seqNoRef: FirebaseFirestore.DocumentReference, seqNumberName: string): Promise<ISequenceNumber>{

    return seqNoRef.get()
        .then((seqNoSnapshot) => {
        if(seqNoSnapshot.exists ) {
            return getStoredSequenceNumber(seqNoSnapshot)
            .then((result: ISequenceNumber )=> {
                return result;
            })
        }
        else {
            return getSeqNoFromDocuments(seqNoRef, seqNumberName)
        }
    })
}

async function getSeqNoFromDocuments(seqNoRef: FirebaseFirestore.DocumentReference, seqNumberName: string): Promise<ISequenceNumber> {

    const result = await doGetSequenceNumberFromDocuments(seqNoRef, seqNumberName)
    return result;

}

function doGetSequenceNumberFromDocuments(seqNoRef: FirebaseFirestore.DocumentReference, seqNumberName: string){
                const path = seqNumberName
                const collectionRef = admin.firestore().collection(path).orderBy('number', 'desc');
                return collectionRef.get()
                .then(querySnapshot => {
                    const documents = querySnapshot.docs;
                    const nextNumber = documents[0].get('number') + 1
                    const returnValue = {number: nextNumber};
                    storeNewSequenceNumber(seqNumberName, nextNumber)
                    return returnValue;
                })
                .catch(error => {
                    return error;
                })
}

function storeNewSequenceNumber(seqNumberName: string, nextNumber: number){
    const seqNoPath = 'sequenceNumbers'
                    admin.firestore().collection(seqNoPath).doc(seqNumberName)
                    .set({ value: nextNumber +1}, {merge: true})
                    .then(result => {
                        console.log('Successfully created sequence number document. Result', result)
                    })
                    .catch(error => {
                        return error;
                    })
}

function getStoredSequenceNumber(seqNoSnapshot: FirebaseFirestore.DocumentSnapshot): Promise<ISequenceNumber> {
            const nextNumber = seqNoSnapshot.get('value')
            const newNumber = nextNumber+1;
            const seqNoDocRef = seqNoSnapshot.ref;
            return seqNoDocRef.set({value: newNumber}, {merge: true})
            .then(() => {
                const sequenceNumber: ISequenceNumber = ({number: nextNumber}) ;
                return sequenceNumber
            })

}

function getSequenceNumbersPath(tenantId: string, projectId: string){
    return `tenants/${tenantId}/projects/${projectId}/sequenceNumbers`
}
function getOneSequenceNumberPath (tenantId: string, projectId: string, seqNumberName: string){
    return getSequenceNumbersPath(tenantId, projectId) + '/' + seqNumberName;
}



// else{

//     // we have to create the document constaining the sequence number

//     // First we need to check the number of documents in the collection
//     // That is, if seqNoName is 'Reallocations' we have to find the existing
//     // highest number for Reallocations

//     path = 'projects/'+projectId + '/' + seqNumberName

//     const collectionRef = admin.firestore().collection(path).orderBy('number', 'desc');
//     return collectionRef.get()
//     .then(querySnapshot => {
//         const documents = querySnapshot.docs;


//         const nextNumber = documents[0].get('number') + 1
//         const seqNoPath = 'projects/' + projectId + '/sequenceNumbers';
//         const seqNoCollection = admin.firestore().collection(seqNoPath).doc(seqNumberName).set({
//             value: nextNumber +1
//         }).then (result => {
//             return({number: nextNumber})
//         })
//         .catch(error => {
//             return error;
//         })


//     })

//         }
