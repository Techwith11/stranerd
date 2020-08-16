<template>
	<div>
		<helper-spinner v-if="loading"/>
		<div v-else>
			<helper-message :message="error" v-if="error" />
			<div v-else class="container-fluid py-3">
				<note-card :note="note" v-for="note in notes" :key="note.id" />
				<div class="d-flex justify-content-end mb-3" v-if="hasMore">
					<button class="btn-success" @click="fetchOlderNotes">
						<i class="fas fa-spinner fa-spin mr-2" v-if="olderNotesLoading"></i>
						<span>Fetch More</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import NoteCard from '@/components/admin/notes/list/NoteCard.vue'
	import { useNotesList } from '@/usecases/shop/useNotes'
	export default defineComponent({
		name: 'Notes',
		setup(){
			const { loading, notes, error, hasMore, olderNotesLoading, fetchOlderNotes } = useNotesList()
			return { loading, notes, error, hasMore, olderNotesLoading, fetchOlderNotes }
		},
		components: {
			'note-card': NoteCard,
		},
		meta(){
			return {
				title: 'Shop Notes',
				meta: [
					{
						vmid: 'robots',
						name: 'robots',
						content: 'none'
					}
				]
			}
		}
	})
</script>
