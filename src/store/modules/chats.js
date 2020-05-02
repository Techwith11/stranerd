import firebase,{ firestore, storage } from '@/config/firebase'

let sendChat = async (auth, path, data) => {
    let chat = {
        dates: {
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
            readAt: null
        },
        from: auth,
        content: data.content
    }
    return await firestore.collection(path).add(chat)
}

let sendMediaChat = async (auth, path, data) => {
    let chat = {
        dates: {
            sentAt: firebase.firestore.FieldValue.serverTimestamp(),
            readAt: null
        },
        from: auth,
    }
    let file = data.media
    let link = `${path}/${Date.now()}_${file.name}`
    if(window.location.hostname === 'localhost'){
        chat.media = { name: file.name, type: file.type, link }
    }else{
        await storage.ref(link).put(this.video)
        link = await storage.ref(link).getDownloadURL()
        chat.media = { name: file.name, type: file.type, link }
    }
    return await firestore.collection(path).add(chat)
}

let readChat = async (path) => {
    return await firestore.doc(path).set({
        dates: {
            readAt: firebase.firestore.FieldValue.serverTimestamp()
        }
    }, { merge: true})
}

let actions = {
    async sendChat({ getters }, data){
        let chat = [getters.getId, data.id].sort().join('_')
        let path = `chats/singles/${chat}`
        return await sendChat(getters.getId, path, data)
    },
    async sendMedia({ getters }, data) {
        let chat = [getters.getId, data.id].sort().join('_')
        let path = `chats/singles/${chat}`
        return await sendMediaChat(getters.getId, path, data)
    },
    async readChat(store, data){
        let path = `chats/singles/${data.path}/${data.id}`
        return await readChat(path)
    },
    async readSessionChat(store, data){
        let path = `sessions/${data.path}/chats/${data.id}`
        return await readChat(path)
    },
    async sendSessionChat({ getters }, data){
        let path = `sessions/${data.id}/chats`
        return await sendChat(getters.getId, path, data)
    },
    async sendSessionMedia({ getters }, data){
        let path = `sessions/${data.id}/chats`
        return await sendMediaChat(getters.getId, path, data)
    }
}

export default { actions }