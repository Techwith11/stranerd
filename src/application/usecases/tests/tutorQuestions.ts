import { computed, reactive } from '@vue/composition-api'
import { QuestionEntity } from '@root/modules/tests/domain/entities/question'
import { DeleteTutorQuestion, GetTutorQuestionsByModule } from '@root/modules/tests'
import { Alert, Notify } from '@/config/notifications'

const PAGINATION_LIMIT = parseInt(process.env.VUE_APP_PAGINATION_LIMIT)
const getKey = (subject: string, module: string) => `${subject}_${module}`
const getNewState = () => reactive({
	questions: [],
	fetched: false,
	loading: false,
	error: '',
	hasMore: true,
	olderQuestionsLoading: false
})

const globalState = reactive({}) as {
	[key: string]: {
		questions: QuestionEntity[],
		fetched: boolean,
		loading: boolean,
		error: string,
		hasMore: boolean,
		olderQuestionsLoading: boolean
	}
}

const setTutorQuestion = (subject: string, module: string, question: QuestionEntity) => {
	const key = getKey(subject, module)
	if(!globalState[key]) globalState[key] = getNewState()
	const index = globalState[key].questions.findIndex((p) => p.id === question.id)
	if(index !== -1) globalState[key].questions[index] = question
	else globalState[key].questions.push(question)
}
/*const unshiftTutorQuestion = (subject: string, module: string, question: TutorQuestionEntity) => {
	const key = getKey(subject, module)
	if(!globalState[key]) globalState[key] = getNewState()
	const index = globalState[getKey(subject, module)].questions.findIndex((p) => p.id === question.id)
	if(index !== -1) globalState[getKey(subject, module)].questions[index] = question
	else globalState[getKey(subject, module)].questions.unshift(question)
}*/
const fetchTutorQuestions = async (subject: string, module: string) => {
	const key = getKey(subject, module)
	const date = globalState[key]?.questions[globalState[key]?.questions?.length - 1]?.createdAt ?? undefined
	const entities: QuestionEntity[] = await GetTutorQuestionsByModule.call(subject, module, date)
	globalState[key].hasMore = entities.length === PAGINATION_LIMIT
	entities.forEach((entity) => setTutorQuestion(subject, module, entity))
}
const fetchTutorQuestionsOnInit = async (subject: string, module: string) => {
	globalState[getKey(subject, module)].loading = true
	await fetchTutorQuestions(subject, module).catch(() => globalState[getKey(subject, module)].error = 'Failed to fetch questions')
	if(globalState[getKey(subject, module)].questions.length === 0) globalState[getKey(subject, module)].error = `No questions found for ${module} at the moment. Check again later`
	globalState[getKey(subject, module)].loading = false
}
const fetchOlderQuestions = async (subject: string, module: string) => {
	globalState[getKey(subject, module)].olderQuestionsLoading = true
	await fetchTutorQuestions(subject, module)
	globalState[getKey(subject, module)].olderQuestionsLoading = true
}

export const useTutorQuestionsList = (subject: string, module: string) => {
	const key = getKey(subject, module)

	if(!globalState[key]) globalState[key] = getNewState()
	if(!globalState[key].fetched) fetchTutorQuestionsOnInit(subject, module).then(() => globalState[key].fetched = true)

	return {
		loading: computed(() => globalState[key].loading),
		olderQuestionsLoading: computed(() => globalState[key].olderQuestionsLoading),
		hasMore: computed(() => globalState[key].hasMore),
		error: computed(() => globalState[key].error),

		questions: computed(() => globalState[key].questions),

		fetchOlderQuestions: async () => await fetchOlderQuestions(subject, module)
	}
}

export const useDeleteTutorQuestion = (question: QuestionEntity) => {
	const key = getKey(question.subject, question.module)
	const state = reactive({
		loading: false
	})

	const deleteTutorQuestion = async () => {
		const res = await Alert({
			title: 'Delete question',
			text: 'Are you sure you want to delete this question',
			icon: 'info',
			confirmButtonText: 'Delete'
		})
		if(res.value){
			try{
				state.loading = true
				await DeleteTutorQuestion.call(question.id)
				globalState[key].questions = globalState[key].questions.filter((q) => q.id !== question.id)
				state.loading = false
				await Notify({ title: 'Question deleted!', icon: 'success' })
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
		}
	}

	return { loading: computed(() => state.loading), deleteTutorQuestion }
}
