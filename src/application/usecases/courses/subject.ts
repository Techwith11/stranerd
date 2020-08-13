import { computed, reactive } from '@vue/composition-api'
import { ModuleEntity, SubjectEntity } from '@root/modules/courses/domain/entities/subject'
import { GetSubjects } from '@root/modules/courses'

const globalState = reactive({
	subjects: reactive([]) as SubjectEntity[],
	fetched: false,
	loading: false,
	error: '',
})

const fetchSubjects = async () => {
	globalState.loading = true
	globalState.subjects = await GetSubjects.call()
	globalState.fetched = true
	globalState.loading = false
}

export const useSubjects = () => {
	if(!globalState.fetched) fetchSubjects().catch(error => globalState.error = error)

	return {
		subjects: computed(() => globalState.subjects),
		loading: computed(() => globalState.loading),
		error: computed(() => globalState.error),
		modules: computed(() => globalState.subjects.reduce((total: ModuleEntity[], val: SubjectEntity) => {
			total.push(...val.modules)
			return total
		},[])),
	}
}
