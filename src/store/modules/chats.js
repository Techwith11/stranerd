import firebase,{ firestore, functions, storage } from '@/config/firebase'

let uploadFile = async (path, file) => {
    try{
        let link = `${path}/${Date.now()}_${file.name}`
        if(process.env.NODE_ENV === 'production'){
            await storage.ref(link).put(file)
            link = await storage.ref(path).getDownloadURL()
        }else{
            link = `http://localhost:5000/${link}`
        }
        return { name: file.name, link, type: file.type }
    }catch{ throw new Error(`Error uploading ${file.name}`) }
}

let helpers = {
    createNewChatCollection: async (from, to) => {
        let createNewSingleChatCollection = functions.httpsCallable('createNewSingleChatCollection')
        return createNewSingleChatCollection({ from, to })
    },
    sendChat: async (auth, path, data) => {
        let chat = {
            dates: {
                sentAt: firebase.firestore.FieldValue.serverTimestamp(),
                readAt: null
            },
            from: auth,
            content: data.content
        }
        return await firestore.collection(path).add(chat)
    },
    sendMediaChat: async (auth, path, data) => {
        let chat = {
            dates: {
                sentAt: firebase.firestore.FieldValue.serverTimestamp(),
                readAt: null
            },
            from: auth,
        }
        let file = data.media
        chat.media = await uploadFile(path, file)
        return await firestore.collection(path).add(chat)
    },
    readChat: async (path) => {
        return await firestore.doc(path).set({
            dates: {
                readAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        }, { merge: true})
    },
    sendDiscussion: async (userId, id, body) => {
        return await firestore.collection(`courses/${id}/discussions`).add({
            body, userId,
            dates: {
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
        })
    }
}

let actions = {
    async sendChat({ getters }, data){
        let chat = [getters.getId, data.id].sort().join('_')
        let path = `chats/singles/${chat}`
        await helpers.sendChat(getters.getId, path, data)
        if(!getters.getChattedWith.includes(data.id)){
            await helpers.createNewChatCollection(getters.getId, data.id)
        }
    },
    async sendMedia({ getters }, data) {
        let chat = [getters.getId, data.id].sort().join('_')
        let path = `chats/singles/${chat}`
        await helpers.sendMediaChat(getters.getId, path, data)
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
        return await helpers.sendChat(getters.getId, path, data)
    },
    async sendSessionMedia({ getters }, data){
        let path = `sessions/${data.id}/chats`
        return await helpers.sendMediaChat(getters.getId, path, data)
    },
    async sendDiscussion({ getters }, data){
        return await helpers.sendDiscussion(getters.getId, data.id, data.body)
    }
}

export default { actions }