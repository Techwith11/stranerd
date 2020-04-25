import Vue from 'vue'
import VueFirestore from 'vue-firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
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

Vue.use(VueFirestore)
firebase.initializeApp(config)

if(window.location.hostname === 'localhost'){
	firebase.firestore().settings({
		host: 'localhost:8080',
		ssl: false
	})
}

export default firebase
export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const functions = firebase.functions()
export const storage = firebase.storage()

auth.onAuthStateChanged(async (user) => {
	if (user && user.uid) {
		let id = user.uid
		let userData = await firestore
			.collection('users')
			.doc(id)
			.get()
		store.dispatch('setUser', { id, ...userData.data() })
	} else {
		store.dispatch('setUser', null)
	}
})
