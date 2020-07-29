import { firestore } from '@root/helpers/firebase'
import BaseSource from '@data/sources/base'

export default class FirestoreSource extends BaseSource {
	async find(collection, id){
		const doc = await firestore.collection(collection).doc(id).get()
		if(doc.exists) return { '.key': doc.id, ...doc.data() }
		else return undefined
	}
	async get(collection, { limit, order, where }){
		let query = firestore.collection(collection)
		if(order) query = query.orderBy(order.field, order.desc === true ? 'desc' : 'asc')
		if(where) {
			where.forEach(clause => {
				query = query.where(clause.field, clause.condition, clause.value)
			})
		}
		if(limit) query = query.limit(limit)
		const docs = await query.get()
		return docs.docs.map(doc => ({ '.key': doc.id, ...doc.data() }))
	}
	async create(collection, data){
		const doc = await firestore.collection(collection).add(data)
		return { '.key': doc.id, ...doc.data() }
	}
	async update(collection, id, data){
		const doc = await firestore.collection(collection).doc(id).set(data, { merge: true })
		return { '.key': doc.id, ...doc.data() }
	}
}
