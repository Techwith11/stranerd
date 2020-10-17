// @ts-nocheck
import firebase, { firestore, functions, uploadFile } from '@application/config/firebase'

const helpers = {
	createNewChatCollection: async (from, to) => {
		return functions.httpsCallable('createNewSingleChatCollection')({ from, to })
	},
	sendChat: async (from, path, content) => {
		const chat = {
			from, content,
			dates: { sentAt: firebase.firestore.FieldValue.serverTimestamp(), readAt: null },
		}
		return await firestore.collection(path).add(chat)
	},
	sendMediaChat: async (from, path, media) => {
		const chat = {
			from,
			dates: { sentAt: firebase.firestore.FieldValue.serverTimestamp(), readAt: null },
		}
		chat.media = await uploadFile(path, media)
		return await firestore.collection(path).add(chat)
	},
	readChat: async (path) => {
		return await firestore.doc(path).set({
			dates: { readAt: firebase.firestore.FieldValue.serverTimestamp() }
		}, { merge: true })
	}
}

const actions = {
	async sendChat({ getters }, data){
		const chat = [getters.getId, data.id].sort().join('_')
		const path = `chats/${chat}/chats`
		await helpers.sendChat(getters.getId, path, data.content)
		if(!getters.getChattedWith.includes(data.id)){
			await helpers.createNewChatCollection(getters.getId, data.id)
		}
	},
	async sendMedia({ getters }, data) {
		const chat = [getters.getId, data.id].sort().join('_')
		const path = `chats/${chat}/chats`
		await helpers.sendMediaChat(getters.getId, path, data.media)
		if(!getters.getChattedWith.includes(data.id)){
			await helpers.createNewChatCollection(getters.getId, data.id)
		}
	},
	async readChat(store, data){
		const path = `chats/${data.path}/chats/${data.id}`
		return await helpers.readChat(path)
	},
	async readSessionChat(store, data){
		const path = `sessions/${data.path}/chats/${data.id}`
		return await helpers.readChat(path)
	},
	async sendSessionChat({ getters }, data){
		const path = `sessions/${data.id}/chats`
		return await helpers.sendChat(getters.getId, path, data.content)
	},
	async sendSessionMedia({ getters }, data){
		const path = `sessions/${data.id}/chats`
		return await helpers.sendMediaChat(getters.getId, path, data.media)
	},
}

export default { actions }
