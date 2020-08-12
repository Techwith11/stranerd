import { firestore, functions } from '@/config/firebase'
import router from '@/router/index'
import store from '@/store/index'
import { Notify } from '@/config/notifications'

export const checkForUnfinishedTests = async () => {
    let tests = await firestore.collection('tests/tutors/tests')
        .where('user','==', store.getters.getId)
        .where('marked','==',false)
        .limit(1).get()
    if(!tests.empty){
        await router.push(`/tests/tutors/${tests.docs[0].id}`).catch(error => error)
    }
}
export const startTest = async (course: string) => {
    let level = 1 + store.getters.getUser?.tutor['levels'][course] ?? 0
    let user = store.getters.getId
    let data = { user, course, level }
    return functions.httpsCallable('startTutorTest')(data).then(async res => {
        await router.push(`/tests/tutors/${res.data.id}`)
    }).catch(async error => await Notify({ icon: 'error', title: error.message }))
}
export const submitTest = async ({ id, answers }: { id: string, answers: object }) => {
    return functions.httpsCallable('markTutorTest')({ id, answers }).then(async res => res.data.score)
        .catch(async error => await Notify({ icon: 'error', title: error.message }))
}
