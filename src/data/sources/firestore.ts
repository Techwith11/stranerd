import firebase,{ firestore } from '@root/helpers/firebase'
import BaseSource from '@data/sources/base'
import type { GetClauses } from '@data/sources/base'

export default class FirestoreSource implements BaseSource {
	async find(collection: string, id: string){
		const doc = await firestore.collection(collection).doc(id).get()
		if(doc.exists) return { '.key': doc.id, ...doc.data() }
		else return undefined
	}
	async get(collection: string, { limit, order, where }: GetClauses){
		let query: firebase.firestore.Query = firestore.collection(collection)
		if(order) query = query.orderBy(order.field, order.desc ? 'desc' : 'asc')
		if(where) {
			where.forEach(clause => {
				query = query.where(clause.field, clause.condition, clause.value)
			})
		}
		if(limit) query = query.limit(limit)
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
