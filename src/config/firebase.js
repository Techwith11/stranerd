import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

import store from '@/store/'

const config = {
	apiKey: 'AIzaSyCk6CnAF1mcdp9jOh2r1zDQS67-cHVpqZY',
	authDomain: 'stranerd-13084.firebaseapp.com',
	databaseURL: 'https://stranerd-13084.firebaseio.com',
	projectId: 'stranerd-13084',
	storageBucket: 'stranerd-13084.appspot.com',
	messagingSenderId: '506823871526',
	appId: '1:506823871526:web:d15505b1c865808540eae7',
	measurementId: 'G-GGEXBNQ0KK',
}

firebase.initializeApp(config)

if(process.env.NODE_ENV === 'development'){
	firebase.firestore().settings({
		host: 'localhost:5002',
		ssl: false
	})
	firebase.functions().useFunctionsEmulator('http://localhost:5001')
}

export default firebase
export const auth = firebase.auth()
export const database = firebase.database()
export const firestore = firebase.firestore()
export const functions = firebase.functions()

if(process.env.NODE_ENV === 'production'){
	auth.onAuthStateChanged(async user => user && user.uid ? store.dispatch('setId', user.uid) : null)
}

let uploadToMockServer = async (path, file) => {
	let data = new FormData()
	data.set('path', path)
	data.set('file', file)
	let res = await fetch('http://localhost:3000/file', {
		method: 'POST',
		body: data,
	})
	return res.json()
}
window.uploadFile = async (path, file) => {
	try{
		let link = `${path}/${Date.now()}_${file.name}`
		if(process.env.NODE_ENV === 'production'){
			await storage.ref(link).put(file)
			link = await storage.ref(path).getDownloadURL()
		}else{
			link = `stranerd/${link}`
			await uploadToMockServer(link, file)
			link = `http://localhost:3000/${link}`
		}
		return { name: file.name, link, type: file.type }
	}catch{ throw new Error(`Error uploading ${file.name}`) }
}