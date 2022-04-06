import * as admin  from 'firebase-admin';
import * as functions from 'firebase-functions';
import { resolve } from 'url';
import { options } from '../config'


export const collectionBase = options.collectionBase;
export const projectId = ''

export const updateCounter = function (path: string, collectionName: string,  state: any): Promise<any> {
    console.log(`UPDATE COUNTER starting`)
        // Select a shard of the counter at random:
        const num_shards = 10;
        // const docRef = admin.firestore().doc('collectionCounts/'+collectionName);
        // const projectId = 'a';
        // const docRef = admin.firestore().doc('projects/'+projectId + '/collectionCounts/' + 'costCodes');
        const docRef = admin.firestore().doc(path + '/collectionCounts/' + collectionName);

        const shard_id = Math.floor(Math.random() * num_shards).toString();
        // console.log('UPDATE COUNTER shardId', shard_id);
        const shard_ref = docRef.collection('shards').doc(shard_id);



        const isDelete = state.isDelete;
        const isCreate = state.isCreate;
        console.log(`UPDATE COUNTER, isDelete`, isDelete);
        console.log('UPDATE COUNTER isCreate', isCreate);

        if( isDelete || isCreate ){

            // Update count in a transaction
            return admin.firestore().runTransaction(t => {
                return t.get(shard_ref).then(doc => {

                   let old_count = 0
                   if (doc) {
                       const data = doc.data();
                       if (data !== undefined) {
                        old_count = data.count
                       }

                   }
                    let new_count = 0;
                    if(isCreate){
                        new_count = old_count + 1;
                    }
                    else{
                        if(isDelete){
                            new_count = old_count - 1;
                            // new_count = new_count<0 ? 0 : new_count;
                        }
                    }
                    console.log('UPDATE COUNTER old count, new count',new_count, old_count);
                    t.update(shard_ref, { count: new_count });
                });
            });
        }
        else{

            // just create an empty promise
            return new Promise(succeed => setTimeout(resolve, 1));

        }
    }

    /**
     * initShards
     *
     * Intitialise shards for a parent collection
     * URL: https://us-central1-fourcastpro.cloudfunctions.net/initShards
     */
    export const initShards = functions.https.onRequest((request,response)=> {
        // console.log('Received request to init shards');
        const docRef = admin.firestore().doc('tenants/3pbviiPlIkpp0mPBhypQ/collectionCounts/'+'suppliers');
        createCounter(docRef, 10, function(){
            response.send('Updated shards successfully')
        })
    })

    /**
     * doShards
     *
     * Just a test to find the url for a http request
     * This url: https://us-central1-fourcastpro.cloudfunctions.net/doShards
     */
    export const doShards = functions.https.onRequest((request, response) => {
        response.send('Received doShards request')
    })


    // we are not going to count project sub collections at the moment.

    // export const initProjectShards = functions.https.onRequest((request,response)=> {
    //     console.log('Received request to init shards');
    //     const docRef = admin.firestore().doc('projects/8A81DC4523F6437F97AA951081842219/collectionCounts/'+'reallocations');
    //     createCounter(docRef, 10)
    //     response.send('Updated shards successfully');
    // })


    function createCounter(ref: any, num_shards: number, callback: any) {
        const batch = admin.firestore().batch();

        // Initialize the counter document
        console.log('CREATE COUNTER initialise the counter')
        batch.set(ref, { num_shards: num_shards });

        // Initialize each shard with count=0
        for (let i = 0; i < num_shards; i++) {
            console.log('CREATE COUNTER setting counter for shard: ',i)
            const shardRef = ref.collection('shards').doc(i.toString());
            batch.set(shardRef, { count: 0 });
        }

        // Commit the write batch
        console.log('CREATE COUNTER now commit the batch')
        batch.commit()
              .then(res => {
                  console.log(`CREATE COUNTER, commit ok, now calling callback`)
                  callback()
                })
              .catch(error => {
                  console.log(`CREATE COUNTER commit error`, error);
                  callback()
                });
    }

    export const initializeCount = functions.https.onRequest((request,response)=> {
        // console.log('Received request to initialize counter');
        // const docRef = admin.firestore().doc('collectionCounts/'+'projects');
        getAndSetCount('projects', function(){
            response.send('Initialised counter for projects')
        }
            );

    })

    function getAndSetCount(collectionName: string, callback: Function) {
        // Sum the count of each shard in the subcollection

        const ref = admin.firestore().collection(collectionName);

        ref.get()
        .then(snapshot => {
            let total_count = 0;
            snapshot.forEach(doc => {
                total_count ++;
            });
            setCounter(collectionName, total_count, callback);
            })
        .catch(error => console.log(error));
    }

    function setCounter(collectionName: string, newCount: number, callback: Function) {
        const docRef = admin.firestore().doc('collectionCounts/'+collectionName);
        const shard_id = '0';
        const shard_ref = docRef.collection('shards').doc(shard_id);

        admin.firestore().runTransaction(t => transactionFunction(t))
            .then(res => callback)
            .catch(error => console.log(error))

        function transactionFunction(t: any){
            return t.get(shard_ref)
            .then((doc: any )=> {
                t.update(shard_ref, { count: newCount });
                })
            .catch((Error: any) => console.log(Error))
        }
     }

     export const getTotals = functions.https.onRequest((request,response)=> {
        // console.log('GET TOTALS');

        // doAsyncTask().then (res => {
        //     console.log('task completed')
        //     response.send('completed')
        // })
        // .catch((error) => {
        //     console.log(error);
        //     response.send(error);
        // });
        return getTotalCount('suppliers')
        .then(res => {
            response.send(res);
        })
        .catch((error) => {
            response.send(error)
        })

            // response.send('Done');
})

export const getTotal = functions.https.onCall((data,context) => {
    // console.log('GET TOTAL data, context', data, context);
    const collectionName = 'suppliers' //data.collectionName;
    return getTotalCount(collectionName)
       .then(res => {
        //    console.log('GET TOTAL result:', res)
           return res;
       })
       .catch((error) => {
           return error;
       })
})

function getTotalCount(collectionName: string): Promise<any>{

    let count = 0;
    const db = admin.firestore();
    return db.collection('collectionCounts/'+collectionName+'/shards')
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // console.log('for each ',doc, doc.data()['count']);
                count += doc.data()['count'];
                // console.log('count', count);
            });
            return {grand_total: count};

        })
        .catch(function(error: any){
            return('An error occurred: '+ error);
        })
}







