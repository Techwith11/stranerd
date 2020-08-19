// @ts-nocheck
import { functions } from '@/config/firebase'

const url = `https://firebasestorage.googleapis.com/v0/b/stranerd-13084.appspot.com/o/${encodeURIComponent('users/images/user_profile.png')}?alt=media`

const state = {
	defaultImage: process.env.NODE_ENV === 'production' ? url : '/img/user_profile.png',
}

const getters = {
	getDefaultImage: (state) => state.defaultImage,
}


const actions = {
	async subscribeToMail(store, email){
		return await functions.httpsCallable('subscribeToMailingList')({ email })
	}
}

export default { state, getters, actions }
