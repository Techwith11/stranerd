<template>
	<Default>
    <banner>
      <h1>Buy Books and eTextbooks</h1>
    </banner>
    <helper-spinner v-if="loading"/>
		<div v-else class="my-3">
			<helper-message message="No notes currently in the shop. Check again later" v-if="notes.length === 0" />
			<div class="container-fluid grid" v-else>
				<note-card v-for="note in notes" :key="note.id" :note="note" />
				<div class="d-flex justify-content-end my-3" v-if="hasMore">
					<button class="btn-success" @click="fetchOlderNotes">
						<i class="fas fa-spinner fa-spin mr-2" v-if="olderNotesLoading"></i>
						<span>Fetch More</span>
					</button>
				</div>
			</div>
			<button class="floating-button" @click="setCartModalOverview" v-if="cartLength"><i class="fas fa-shopping-basket"></i></button>
		</div>
	</Default>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import NoteCard from '@/components/shop/list/NoteCard.vue'
import { useNotesList } from '@/usecases/shop/notes'
import { useCart } from '@/usecases/shop/cart'
import { useStore } from '@/usecases/store'
export default defineComponent({
	name: 'Shop',
	setup(){
		const { loading, error, notes, hasMore, olderNotesLoading, fetchOlderNotes } = useNotesList()
		const { cartLength } = useCart()
		return {
			loading, error, notes,
			hasMore, olderNotesLoading, fetchOlderNotes, cartLength,
			setCartModalOverview: useStore().modals.setCartModalOverview
		}
	},
	components: {
		'note-card': NoteCard
	},
	meta(){
		return {
			title: 'Shop on Stranerd',
			meta: [
				{
					vmid: 'description',
					name: 'description',
					content: ''
				},
				{
					vmid: 'keywords',
					name: 'keywords',
					content: [].join(', ')
				}
			]
		}
	}
})
</script>

<style lang="scss" scoped>
	.grid{
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-column-gap: 1rem;
		grid-row-gap: 1.5rem;
	}
	@media (min-width: $md) {
		.grid{
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
