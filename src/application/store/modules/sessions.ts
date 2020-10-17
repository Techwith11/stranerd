// @ts-nocheck
import { firestore, functions } from '@application/config/firebase'
import router from '@application/router/index'

const setSessionListener = (id, commit, userId) => {
	const listener = firestore.collection('sessions').doc(id).onSnapshot((snapshot) => {
		commit('setSession',[ { '.key': snapshot.id, ...snapshot.data() }, userId ])
		commit('setOtherPersonListener', userId)
	})
	commit('setSessionListener', listener)
}
const acceptSession = async (id) => {
	return await firestore.collection('sessions').doc(id).update('accepted', true)
}
const rejectSession = async (id) => {
	return await firestore.collection('sessions').doc(id).update('cancelled.tutor', true)
}
const submitRating = async (id, session, review) => {
	if(session.tutor === id){
		await firestore.collection('sessions').doc(session['.key']).set({
			reviews: { tutor: review }
		}, { merge: true })
	}else if(session.student === id){
		await firestore.collection('sessions').doc(session['.key']).set({
			reviews: { student: review }
		}, { merge: true })
		await functions.httpsCallable('addRatingToTutor')({
			review, session: session['.key'], tutor: session.tutor
		})
	}
}
const tutorSelectSessionState = (session, id) => session.tutor === id && session.accepted === false && session.cancelled.tutor === false && session.cancelled.student === false && session.paid === false
const studentCancelsSessionState = (session, id) => session.tutor === id && session.cancelled.tutor === false && session.cancelled.student === true && session.paid === false
const tutorRejectsSessionState = (session, id) => session.student === id && session.accepted === false && session.cancelled.tutor === true && session.cancelled.student === false && session.paid === false
const tutorAcceptsSessionState = (session, id) => session.student === id && session.accepted === true && session.cancelled.tutor === false && session.cancelled.student === false && session.paid === false
const tutorAcceptedSessionState = (session, id) => session.tutor === id && session.accepted === true && session.cancelled.tutor === false && session.cancelled.student === false && session.paid === false
const studentPaidSessionState = (session, id) => session.tutor === id && session.accepted === true && session.cancelled.tutor === false && session.cancelled.student === false && session.paid === true

const state = {
	session: null,
	tutorListener: () => {},
	sessionListener: () => {},
	sessionModal: null,
	newSessionData: {},
	otherPerson: null,
	otherPersonListener: () => {},
	sessionForRatings: null,
}

const getters = {
	getCurrentSession: (state) => state.session,
	getSessionForRatings: (state) => state.sessionForRatings,
	isSessionModalOpen: (state) => !!state.sessionModal,
	getNewSessionData: (state) => state.newSessionData,
	getOtherPersonOnSession: (state) => state.otherPerson,
	isSessionModalStudentDuration: (state) => state.sessionModal === 'student-duration',
	isSessionModalTutorAccept: (state) => state.sessionModal === 'tutor-accept',
	isSessionModalStudentWaiting: (state) => state.sessionModal === 'student-waiting',
	isSessionModalTutorCancelled: (state) => state.sessionModal === 'tutor-cancelled',
	isSessionModalStudentCancelled: (state) => state.sessionModal === 'student-cancelled',
	isSessionModalStudentPays: (state) => state.sessionModal === 'student-pays',
	isSessionModalTutorWaiting: (state) => state.sessionModal === 'tutor-waiting',
	isSessionModalSessionRatings: (state) => state.sessionModal === 'session-ratings',
}

const mutations = {
	async setSession(state, [session, id]){
		state.session = session
		if(session){
			if(tutorSelectSessionState(session,id)){ state.sessionModal = 'tutor-accept' }
			else if (studentCancelsSessionState(session,id)){ state.sessionModal = 'student-cancelled' }
			else if(tutorRejectsSessionState(session,id)){ state.sessionModal = 'tutor-cancelled' }
			else if(tutorAcceptsSessionState(session,id)){ state.sessionModal = 'student-pays' }
			else if(tutorAcceptedSessionState(session,id)){ state.sessionModal = 'tutor-waiting' }
			else if(studentPaidSessionState(session,id)){
				const name = state.otherPerson ? state.otherPerson.bio.name : 'Student'
				new window.Toast({ icon: 'success', title: `${name} has paid for the session` })
				await router.push(`/sessions/${session['.key']}`).catch((error) => error)
				state.sessionModal = null
				state.newSessionData = {}
				state.sessionListener()
				state.sessionListener = () => {}
				state.session = null
				state.otherPerson = null
				state.otherPersonListener()
				state.otherPersonListener = () => {}
			}
		}
	},
	setSessionListener: (state, listener) => {
		state.sessionListener()
		state.sessionListener = listener
	},
	setOtherPersonListener: (state, auth) => {
		if(!state.otherPerson){
			const other = state.session.tutor === auth ? state.session.student : state.session.tutor
			state.otherPersonListener = firestore.collection('users').doc(other).onSnapshot((snapshot) => {
				state.otherPerson = snapshot.data()
			})
		}
	},
	closeOtherPersonListener: (state) => {
		state.otherPerson = null
		state.otherPersonListener()
		state.otherPersonListener = () => {}
	},
	setTutorSessionsListener: (state, listener) => {
		state.tutorListener()
		state.tutorListener = listener
	},
	setSessionModalStudentDuration: (state, data) => {
		state.sessionModal = 'student-duration'
		state.newSessionData = data
	},
	setSessionModalStudentWaiting: (state) => state.sessionModal = 'student-waiting',
	setSessionModalSessionRatings: (state, session) => {
		state.sessionForRatings = session
		state.sessionModal = 'session-ratings'
	},
	closeSessionModal: (state) => {
		state.sessionModal = null
		state.newSessionData = {}
		state.sessionForRatings = null
	},
}

const actions = {
	async startSession({ getters, commit }, data){
		// TODO: After implementing active users, show toast if tutor is not online
		return await functions.httpsCallable('startSession')(data).then((res) => {
			setSessionListener(res.data, commit, getters.getId)
			commit('setSessionModalStudentWaiting')
		}).catch((error) => {
			new window.Toast({ icon: 'error', title: error.message })
			commit('setSessionListener', () => {})
			commit('setSession', [null, null])
			commit('closeOtherPersonListener')
			commit('closeSessionModal')
		})
	},
	closeSessionListener({ commit }){
		commit('setSessionListener', () => {})
		commit('setSession', [null, null])
	},

	async acceptSession({ getters }){
		const session = getters.getCurrentSession
		if(session && session['.key']){
			await acceptSession(session['.key'])
		}
	},
	async rejectSession({ commit, getters}){
		const session = getters.getCurrentSession
		if(session && session['.key']){
			await rejectSession(session['.key'])
			commit('setSessionListener', () => {})
			commit('setSession', [null, null])
			commit('closeOtherPersonListener')
			commit('closeSessionModal')
		}
	},

	async payForSession({ commit, getters }){
		const session = getters.getCurrentSession
		const data = { id: session['.key'] }
		try{
			await functions.httpsCallable('payForSession')(data)
			await router.push(`/sessions/${session['.key']}`)
			commit('setSessionListener', () => {})
			commit('setSession', [null, null])
			commit('closeOtherPersonListener')
			commit('closeSessionModal')
		}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
	},

	initializeTutorSessionsListener({ getters, commit }){
		const listener = firestore.collection('sessions')
			.where('tutor','==', getters.getId)
			.where('cancelled.tutor','==', false)
			.where('cancelled.student','==', false)
			.where('accepted','==',false)
			.where('paid','==',false)
			.orderBy('dates.createdAt','desc')
			.limit(1)
			.onSnapshot((snapshot) => {
				if(!snapshot.empty){
					setSessionListener(snapshot.docs[0].id, commit, getters.getId)
				}
			})
		commit('setTutorSessionsListener', listener)
	},
	closeTutorSessionsListener({ commit }){ commit('setTutorSessionsListener', () => {}) },

	showSessionRatingsForm({ commit }, session){
		commit('setSessionModalSessionRatings', session)
	},
	async submitSessionRating({ commit, getters }, { rating, comment }){
		if(rating || comment){
			await submitRating(getters.getId, getters.getSessionForRatings, { rating, comment })
		}
		commit('closeSessionModal')
	},

	setSessionModalStudentDuration({ commit }, data = {}){ commit('setSessionModalStudentDuration', data) },
	async cancelSessionAndCloseModal({ getters, commit }){
		try{
			const session = getters.getCurrentSession
			if(session && session.cancelled){
				const canceller = getters.getId === session.student ? 'student' : 'tutor'
				const other = session && getters.getId === session.student ? 'tutor' : 'student'
				if(session.cancelled[other] === false){
					await firestore.collection('sessions').doc(session['.key']).update(`cancelled.${canceller}`,true)
				}
			}
		}catch(error){ new window.Toast({ icon: 'error', title: error.message}) }
		commit('setSessionListener', () => {})
		commit('setSession', [null, null])
		commit('closeOtherPersonListener')
		commit('closeSessionModal')
	}
}

export default { state, getters, mutations, actions }
