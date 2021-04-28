import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'

const config = {
	apiKey: 'AIzaSyCk6CnAF1mcdp9jOh2r1zDQS67-cHVpqZY',
	authDomain: 'stranerd-13084.firebaseapp.com',
	databaseURL: process.env.NODE_ENV === 'production' ? 'https://stranerd-13084.firebaseio.com' : 'http://localhost:5003/?ns=stranerd-13084',
	projectId: 'stranerd-13084',
	storageBucket: 'stranerd-13084.appspot.com',
	messagingSenderId: '506823871526',
	appId: '1:506823871526:web:d15505b1c865808540eae7',
	measurementId: 'G-GGEXBNQ0KK',
}

if(firebase.apps.length === 0) firebase.initializeApp(config)

if(process.env.NODE_ENV === 'development'){
	firebase.firestore().settings({
		host: 'localhost:5002',
		ssl: false
	})
	firebase.auth().useEmulator('http://localhost:5004')
	firebase.functions().useEmulator('localhost', 5001)
}

firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch(() => {
	console.warn('Your browser does not allow offline support, so you will need internet connection to get live data from Stranerd')
})

export default firebase
export const auth = firebase.auth()
export const database = firebase.database()
export const firestore = firebase.firestore()
export const functions = firebase.functions()
export const storage = firebase.storage()

const uploadToMockServer = async (path: string, file: File) => {
	const data = new FormData()
	data.set('path', path)
	data.set('file', file)
	const res = await fetch('http://localhost:3000/file', {
		method: 'POST',
		body: data,
	})
	return res.json()
}
export const uploadFile = async (path: string, file: File) => {
	try{
		path = `${path}/${Date.now()}_${file.name}`
		let link: string
		if(process.env.NODE_ENV === 'production'){
			await storage.ref(path).put(file)
			link = await storage.ref(path).getDownloadURL()
		}else{
			path = `stranerd/${path}`
			await uploadToMockServer(path, file)
			link = `http://localhost:3000/${path}`
		}
		return { name: file.name, path, link, type: file.type }
	}catch{ throw new Error(`Error uploading ${file.name}`) }
}
