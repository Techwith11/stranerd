import {firestore, functions} from '@/config/firebase'
import router from "@/router/index"

let setSessionListener = (id, commit, userId) => {
    let listener = firestore.collection('sessions').doc(id).onSnapshot(snapshot => {
        commit('setSession',[ { '.key': snapshot.id, ...snapshot.data() }, userId ])
        commit('setOtherPersonListener', userId)
    })
    commit('setSessionListener', listener)
}
let tutorAcceptsSessionState = (state, session, id) => session && session.tutor === id && !session.accepted
let studentCancelsSessionState = (state, session, id) => session && session.tutor === id && session.cancelled && session.cancelled.student
let studentWaitsAndTutorCancelsSessionState = (state, session, id) => session && session.student === id && session.cancelled && session.cancelled.tutor
let studentWaitsAndTutorAcceptsSessionState = (state, session, id) => session && session.student === id && session.accepted

const state = {
    session: null,
    tutorListener: () => {},
    sessionListener: () => {},
    sessionModalState: null,
    newSessionData: {},
    otherPerson: null,
    otherPersonListener: () => {}
}

const getters = {
    getCurrentSession: state => state.session,
    isSessionModalOpen: state => !!state.sessionModalState,
    getNewSessionData: state => state.newSessionData,
    getOtherPersonOnSession: state => state.otherPerson,
    isSessionModalStateStudentDuration: state => state.sessionModalState === 'student-duration',
    isSessionModalStateTutorAccept: state => state.sessionModalState === 'tutor-accept',
    isSessionModalStateStudentWaiting: state => state.sessionModalState === 'student-waiting',
    isSessionModalStateTutorCancelled: state => state.sessionModalState === 'tutor-cancelled',
    isSessionModalStateStudentCancelled: state => state.sessionModalState === 'student-cancelled',
    isSessionModalStateTutorWaiting: state => state.sessionModalState === 'tutor-waiting',
}

const mutations = {
    async setSession(state, [session, id]){
        state.session = session
        tutorAcceptsSessionState(state,session,id) ? state.sessionModalState = 'tutor-accept' : null
        studentCancelsSessionState(state,session,id) ? state.sessionModalState = 'student-cancelled' : null
        studentWaitsAndTutorCancelsSessionState(state,session,id) ? state.sessionModalState = 'tutor-cancelled' : null
        if(studentWaitsAndTutorAcceptsSessionState(state,session,id)){
            let name = state.otherPerson ? state.otherPerson.bio.name : 'Tutor'
            new window.Toast({ icon: 'success', title: `${name} accepted the session` })
            await router.push(`/sessions/${session['.key']}`).catch(error => error)
            state.sessionModalState = null
            state.newSessionData = {}
            state.sessionListener()
            state.sessionListener = () => {}
            state.session = null
            state.otherPerson = null
            state.otherPersonListener()
            state.otherPersonListener = () => {}
        }
    },
    setSessionListener: (state, listener) => {
        state.sessionListener()
        state.sessionListener = listener
    },
    setOtherPersonListener: (state, auth) => {
        if(!state.otherPerson){
            let other = state.session.tutor === auth ? state.session.student : state.session.tutor
            state.otherPersonListener = firestore.collection('users').doc(other).onSnapshot(snapshot => {
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
    setSessionModalStateStudentDuration: (state, data) => {
        state.sessionModalState = 'student-duration'
        state.newSessionData = data
    },
    setSessionModalStateStudentWaiting: state => state.sessionModalState = 'student-waiting',
    closeSessionModal: state => {
        state.sessionModalState = null
        state.newSessionData = {}
    },
}

const actions = {
    async startSession({ getters, commit }, data){
        // TODO: After implementing active users, show toast if tutor is not online
        functions.httpsCallable('startSession')(data).then(res => {
            setSessionListener(res.data, commit, getters.getId)
            commit('setSessionModalStateStudentWaiting')
        }).catch(error => {
            new window.Toast({ icon: 'error', title: error.message })
        })
    },
    closeSessionListener({ commit }){
        commit('setSessionListener', () => {})
        commit('setSession', [null, null])
    },

    async acceptSession({ commit, getters }){
        if(getters.getCurrentSession && getters.getCurrentSession['.key']){
            await firestore.collection('sessions').doc(getters.getCurrentSession['.key']).set({ accepted: true}, { merge: true })
            await router.push(`/sessions/${getters.getCurrentSession['.key']}`).catch(error => error)
            commit('setSessionListener', () => {})
            commit('setSession', [null, null])
            commit('closeOtherPersonListener')
            commit('closeSessionModal')
        }
    },

    initializeTutorSessionsListener({ getters, commit }){
        let listener = firestore.collection('sessions')
            .where('tutor','==', getters.getId)
            .where('done','==',false)
            .limit(1)
            .onSnapshot(snapshot => {
                if(!snapshot.empty){
                    setSessionListener(snapshot.docs[0].id, commit, getters.getId)
                }
            })
        commit('setTutorSessionsListener', listener)
    },
    closeTutorSessionsListener({ commit }){ commit('setTutorSessionsListener', () => {}) },

    setSessionModalStateStudentDuration({ commit }, data = {}){ commit('setSessionModalStateStudentDuration', data) },
    async cancelSessionAndCloseModal({ getters, commit }){
        if(getters.getCurrentSession && getters.getCurrentSession.cancelled === undefined){
            let canceller = getters.getId === getters.getCurrentSession.student ? 'student' : 'tutor'
            let cancelled = {}
            cancelled[canceller] = true
            await firestore.collection('sessions').doc(getters.getCurrentSession['.key']).set({
                cancelled,
                done: true
            },{ merge: true })
        }
        commit('setSessionListener', () => {})
        commit('setSession', [null, null])
        commit('closeOtherPersonListener')
        commit('closeSessionModal')
    }
}

export default { state, getters, mutations, actions }