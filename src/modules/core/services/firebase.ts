import firebase,{ firestore, functions } from '@root/services/firebase'
import { GetClauses } from '@root/modules/core/data/datasources/base'

export const FirestoreService =  {
    find: async (collection: string, id: string) => {
        const doc = await firestore.collection(collection).doc(id).get()
        if(doc.exists) return { id: doc.id, ...doc.data() }
        else return undefined
    },
    get: async (collection: string, conditions?: GetClauses) => {
        let query: firebase.firestore.Query = firestore.collection(collection)
        if(conditions) {
            if(conditions.order) query = query.orderBy(conditions.order.field, conditions.order.desc ? 'desc' : 'asc')
            if(conditions.where) {
                conditions.where.forEach(clause => {
                    query = query.where(clause.field, clause.condition, clause.value)
                })
            }
            if(conditions.limit) query = query.limit(conditions.limit)
        }
        const docs = await query.get()
        return docs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    },
    create: async (collection: string, data: object) => {
        const ref = await firestore.collection(collection).add(data)
        return ref.id
    },
    update: async (collection: string, id: string, data: object) => {
        const ref = await firestore.collection(collection).doc(id)
        ref.set(data, { merge: true })
        return ref.id
    }
}

export const FunctionsService = {
    call: async (name: string, data: any) => {
        const callable =  functions.httpsCallable(name)
        const result = await callable(data)
        return result.data
    }
}
