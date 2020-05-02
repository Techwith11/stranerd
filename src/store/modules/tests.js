import { firestore, functions } from '@/config/firebase'
import router from '@/router/index'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {
    async checkForUnfinishedTests({ getters }){
        let tests = await firestore.collection('tests/tutors/tests')
            .where('user','==', getters.getId)
            .where('marked','in',[false])
            .limit(1).get()
        if(!tests.empty){
            await router.push(`/tests/tutors/${tests.docs[0].id}`).catch(error => error)
        }
    },
    startTest({ getters }){
        let tutor = getters.getUser.tutor
        let user = getters.getId
        let course = tutor.courses[0]
        let level = tutor['levels'][course] + 1
        let data = { user, course, level }
        return functions.httpsCallable('startTutorTest')(data).then(async res => {
            await router.push(`/tests/tutors/${res.data.id}`)
        }).catch(error => new window.Toast({ icon: 'error', title: error.message }))
    },
    submitTest(store, data){
        data = { id: data.id, answers: data.answers }
        return functions.httpsCallable('markTutorTest')(data).then(async res => {
            new window.Toast({ icon: 'info', title: `You scored ${res.data.score}%` })
            await router.push('/my_account').catch(error => error)
        }).catch(error => new window.Toast({ icon: 'error', title: error.message }))
    }
}

export default { state, getters, mutations, actions }