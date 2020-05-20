import firebase,{ firestore, functions } from '@/config/firebase'

let helpers = {
    createNewChatCollection: async (from, to) => {
        return functions.httpsCallable('createNewSingleChatCollection')({ from, to })
    },
    sendChat: async (from, path, content) => {
        let chat = {
            from, content,
            dates: { sentAt: firebase.firestore.FieldValue.serverTimestamp(), readAt: null },
        }
        return await firestore.collection(path).add(chat)
    },
    sendMediaChat: async (from, path, media) => {
        let chat = {
            from,
            dates: { sentAt: firebase.firestore.FieldValue.serverTimestamp(), readAt: null },
        }
        chat.media = await window.uploadFile(path, media)
        return await firestore.collection(path).add(chat)
    },
    readChat: async (path) => {
        return await firestore.doc(path).set({
            dates: { readAt: firebase.firestore.FieldValue.serverTimestamp() }
        }, { merge: true })
    },
    sendDiscussion: async (userId, id, body) => {
        return await firestore.collection(`courses/${id}/discussions`).add({
            body, userId,
            dates: { createdAt: firebase.firestore.FieldValue.serverTimestamp() }
        })
    },
    sendPostReply: async (userId, id, body) => {
        return await firestore.collection(`posts/${id}/replies`).add({
            body, userId,
            dates: { createdAt: firebase.firestore.FieldValue.serverTimestamp() }
        })
    }
}

let actions = {
    async sendChat({ getters }, data){
        let chat = [getters.getId, data.id].sort().join('_')
        let path = `chats/singles/${chat}`
        await helpers.sendChat(getters.getId, path, data.content)
        if(!getters.getChattedWith.includes(data.id)){
            await helpers.createNewChatCollection(getters.getId, data.id)
        }
    },
    async sendMedia({ getters }, data) {
        let chat = [getters.getId, data.id].sort().join('_')
        let path = `chats/singles/${chat}`
        await helpers.sendMediaChat(getters.getId, path, data.media)
        if(!getters.getChattedWith.includes(data.id)){
            await helpers.createNewChatCollection(getters.getId, data.id)
        }
    },
    async readChat(store, data){
        let path = `chats/singles/${data.path}/${data.id}`
        return await helpers.readChat(path)
    },
    async readSessionChat(store, data){
        let path = `sessions/${data.path}/chats/${data.id}`
        return await helpers.readChat(path)
    },
    async sendSessionChat({ getters }, data){
        let path = `sessions/${data.id}/chats`
        return await helpers.sendChat(getters.getId, path, data.content)
    },
    async sendSessionMedia({ getters }, data){
        let path = `sessions/${data.id}/chats`
        return await helpers.sendMediaChat(getters.getId, path, data.media)
    },
    async sendDiscussion({ getters }, data){
        return await helpers.sendDiscussion(getters.getId, data.id, data.body)
    },
    async sendPostReply({ getters }, data){
        return await helpers.sendPostReply(getters.getId, data.id, data.body)
    }
}

export default { actions }