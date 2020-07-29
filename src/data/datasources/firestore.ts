import firebase,{ firestore } from '@root/helpers/firebase'
import BaseDataSource, { GetClauses } from '@data/datasources/base'

export default class FirestoreDataSource implements BaseDataSource {
	async find(collection: string, id: string){
		const doc = await firestore.collection(collection).doc(id).get()
		if(doc.exists) return { '.key': doc.id, ...doc.data() }
		else return undefined
	}
	async get(collection: string, conditions?: GetClauses){
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
		return docs.docs.map(doc => ({ '.key': doc.id, ...doc.data() }))
	}
	async create(collection: string, data: object){
		const ref = await firestore.collection(collection).add(data)
		const doc = await ref.get()
		return { '.key': doc.id, ...doc.data() }
	}
	async update(collection: string, id: string, data: object){
		const ref = await firestore.collection(collection).doc(id)
		ref.set(data, { merge: true })
		const doc = await ref.get()
		return { '.key': doc.id, ...doc.data() }
	}
}
