import { computed, reactive } from '@vue/composition-api'
import { ModuleEntity, SubjectEntity } from '@root/modules/courses/domain/entities/subject'
import {
	AddSubject,
	DeleteSubject,
	FindSubject,
	GetSubjectFactory,
	GetSubjects,
	UpdateSubject
} from '@root/modules/courses'
import router from '@/router'
import { Alert, Notify } from '@/config/notifications'
import { useStore } from '@/usecases/store'

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

const fetchSubject = async (id: string) => {
	globalState.loading = true
	const subject = await FindSubject.call(id)
	if(subject){
		const index = globalState.subjects.findIndex((s) => s.id === subject.id)
		if(index === -1) globalState.subjects.push(subject)
		else globalState.subjects[index] = subject
	}
	globalState.loading = false
}

export const useSubjects = () => {
	if(!globalState.fetched) fetchSubjects().catch((error) => globalState.error = error)

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

export const useSingleSubject = (name: string) => {
	const state = reactive({
		loading: false,
		subject: undefined as SubjectEntity | undefined,
		error: ''
	})
	if(!globalState.fetched) {
		state.loading = true
		fetchSubjects().then(async () => {
			const subject = globalState.subjects.find((s) => s.name.toLowerCase() === name.toLowerCase())
			if(subject) state.subject = subject
			else await router.replace('/courses')
			state.loading = false
		}).catch((error) => {
			state.error = error
			state.loading = false
		})
	}

	return {
		loading: computed(() => state.loading),
		subject: computed(() => state.subject),
		error: computed(() => state.error),
	}
}

export const useDeleteSubject = (subject: SubjectEntity) => {
	const state = reactive({
		loading: false
	})

	const deleteSubject = async () => {
		const res = await Alert({
			title: `Delete ${subject.name}`,
			text: 'Are you sure you want to delete this subject',
			icon: 'info',
			confirmButtonText: 'Delete'
		})
		if(res.value){
			try{
				state.loading = true
				await DeleteSubject.call(subject.id)
				globalState.subjects = globalState.subjects.filter((s) => s.id !== subject.id)
				state.loading = false
				await Notify({ title: 'Subject deleted!', icon: 'success' })
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
		}
	}

	return { loading: computed(() => state.loading), deleteSubject }
}

export const useCreateSubject = () => {
	const state = reactive({
		loading: false,
		factory: GetSubjectFactory.call()
	})
	const createSubject = async () => {
		if(state.factory.valid && !state.loading) {
			state.loading = true
			try{
				const id = await AddSubject.call(state.factory)
				state.factory.reset()
				await fetchSubject(id)
				await useStore().modals.closeCreateModal()
				await Notify({ title: 'Subject added successfully!', icon: 'success' })
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
			state.loading = false
		}else state.factory.validateAll()
	}
	return {
		loading: computed(() => state.loading),
		factory: computed(() => state.factory),
		createSubject
	}
}

let currentEdit = undefined as SubjectEntity | undefined

export const setCurrentEditingSubject = (subject: SubjectEntity) => currentEdit = subject

export const useEditSubject = () => {
	const state = reactive({
		loading: false,
		factory: GetSubjectFactory.call()
	})
	if(currentEdit !== undefined) state.factory.loadEntity(currentEdit)
	const editSubject = async () => {
		if(state.factory.valid && !state.loading) {
			state.loading = true
			try{
				const id = await UpdateSubject.call(currentEdit!.id ,state.factory)
				state.factory.reset()
				await fetchSubject(id)
				await useStore().modals.closeEditModal()
				await Notify({ title: 'Subject updated successfully!', icon: 'success' })
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
			state.loading = false
		}else state.factory.validateAll()
	}
	return {
		loading: computed(() => state.loading),
		factory: computed(() => state.factory),
		editSubject
	}
}
