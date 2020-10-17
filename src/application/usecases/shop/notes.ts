import { computed, reactive } from '@vue/composition-api'
import { NoteEntity } from '@modules/shop/domain/entities/note'
import { FindNote, GetNotes, AddNote, GetNoteFactory, UpdateNote, DeleteNote } from '@modules/shop'
import { Alert, Notify } from '@application/config/notifications'
import { useStore } from '@application/usecases/store'

const PAGINATION_LIMIT = parseInt(process.env.VUE_APP_PAGINATION_LIMIT)

const globalState = reactive({
	notes: reactive([]) as NoteEntity[],
	fetched: false,
	loading: false,
	error: '',
	hasMore: false,
	olderNotesLoading: false
})

const setNote = (note: NoteEntity) => {
	const index = globalState.notes.findIndex((n) => n.id === note.id)
	if(index !== -1) globalState.notes.splice(index, 1, note)
	else globalState.notes.push(note)
}
const unshiftNote = (note: NoteEntity) => {
	const index = globalState.notes.findIndex((n) => n.id === note.id)
	if(index !== -1) globalState.notes.splice(index, 1, note)
	else globalState.notes.unshift(note)
}
const fetchNotes = async () => {
	const date = globalState.notes[globalState.notes.length - 1]?.createdAt ?? undefined
	const entities = await GetNotes.call(date)
	globalState.hasMore = entities.length === PAGINATION_LIMIT
	entities.forEach(setNote)
}
const fetchNotesOnInit = async () => {
	globalState.loading = true
	await fetchNotes().catch(() => globalState.error = 'Failed to fetch notes')
	if(globalState.notes.length === 0) globalState.error = 'No notes available at the moment. Check again later'
	globalState.loading = false
}
const fetchOlderNotes = async () => {
	globalState.olderNotesLoading = true
	await fetchNotes()
	globalState.olderNotesLoading = true
}

export const useNotesList = () => {
	if(!globalState.fetched) fetchNotesOnInit().then(() => globalState.fetched = true)

	return {
		loading: computed(() => globalState.loading),
		olderNotesLoading: computed(() => globalState.olderNotesLoading),
		hasMore: computed(() => globalState.hasMore),
		error: computed(() => globalState.error),

		notes: computed(() => globalState.notes),

		fetchOlderNotes
	}
}

export const useDeleteNote = (note: NoteEntity) => {
	const state = reactive({ loading: false })
	const deleteNote = async () :Promise<boolean> => {
		try {
			const result = await Alert({
				title: 'Delete note',
				text: `Are you sure you want to delete ${note.title}? This cannot be undone`,
				icon: 'info',
				confirmButtonText: 'Delete'
			})
			if(result.value) {
				state.loading = true
				await DeleteNote.call(note.id)
				globalState.notes = globalState.notes.filter((a) => a.id !== note.id)
				state.loading = false
				await Notify({ icon: 'success', title: 'Note deleted successfully' })
			}
			return result.value
		} catch(error) {
			await Notify({ icon: 'error', title: error.message })
			return false
		}
	}
	return {
		loading: computed(() => state.loading),
		deleteNote
	}
}

export const useCreateNote = () => {
	const state = reactive({
		loading: false,
		factory: GetNoteFactory.call()
	})

	state.factory.userId = useStore().auth.getId.value

	const createNote = async () => {
		if(state.factory.valid && !state.loading){
			state.loading = true
			state.factory.userId = useStore().auth.getId.value
			try{
				const id = await AddNote.call(state.factory)
				const note = await FindNote.call(id)
				if(note) unshiftNote(note)
				state.factory.reset()
				await useStore().modals.closeCreateModal()
				await Notify({ icon: 'success', title: 'Note created successfully' })
			}catch(error){ await Notify({ icon: 'error', title: error.message }) }
			state.loading = false
		}else state.factory.validateAll()
	}

	return {
		factory: state.factory,
		loading: computed(() => state.loading),
		createNote,
	}
}

let currentEdit = undefined as NoteEntity | undefined

export const setCurrentEditingNote = (note: NoteEntity) => currentEdit = note

export const useEditNote = () => {
	const state = reactive({
		loading: false,
		factory: GetNoteFactory.call()
	})
	if(currentEdit !== undefined) state.factory.loadEntity(currentEdit)
	const editNote = async () => {
		if(state.factory.valid && !state.loading) {
			state.loading = true
			try{
				const id = await UpdateNote.call(currentEdit!.id ,state.factory)
				const note = await FindNote.call(id)
				if(note) unshiftNote(note) //TODO: Figure out cause of un-reactivity
				state.factory.reset()
				await useStore().modals.closeEditModal()
				await Notify({ title: 'Note updated successfully!', icon: 'success' })
			}catch(error){ await Notify({ title: error, icon: 'error' }) }
			state.loading = false
		}else state.factory.validateAll()
	}
	return {
		loading: computed(() => state.loading),
		factory: computed(() => state.factory),
		editNote
	}
}
