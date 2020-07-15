import { firestore, functions } from '@/config/firebase'
import router from '@/router/index'

const actions = {
    async checkForUnfinishedTests({ getters }){
        let tests = await firestore.collection('tests/tutors/tests')
            .where('user','==', getters.getId)
            .where('marked','==',false)
            .limit(1).get()
        if(!tests.empty){
            await router.push(`/tests/tutors/${tests.docs[0].id}`).catch(error => error)
        }
    },
    startTest({ getters }, course){
        let tutor = getters.getUser.tutor
        let user = getters.getId
        let level = tutor['levels'][course] + 1
        let data = { user, course, level }
        return functions.httpsCallable('startTutorTest')(data).then(async res => {
            await router.push(`/tests/tutors/${res.data.id}`)
        }).catch(error => new window.Toast({ icon: 'error', title: error.message }))
    },
    submitTest(store, data){
        data = { id: data.id, answers: data.answers }
        return functions.httpsCallable('markTutorTest')(data).then(async res => res.data.score)
            .catch(error => new window.Toast({ icon: 'error', title: error.message }))
    }
}

export default { actions }
